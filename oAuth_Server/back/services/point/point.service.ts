import { Failable, Point } from '../../@types/response';
import sequelize from '../../models';
import TotalPoint from '../../models/user/totalPoint.model';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { responseObject } from '../../routers/app/utils';

const checkPoint = async (email: string) => {
    let response: Failable<Point[], string>;
    try {
        const result = await sequelize.query(
            `
    SELECT p.id, p.email, p.restAPI, a.appName, p.point 
        FROM point_totals as p
        LEFT OUTER JOIN apps as a
            ON p.restAPI = a.restAPI 
        WHERE email = :email`,
            {
                replacements: { email },
                raw: true,
                model: TotalPoint,
            },
        );
        if (result[0] == undefined) throw new Error('유저정보가 없습니다');
        response = {
            isError: false,
            value: result,
        };
        return response;
    } catch (e) {
        if (e instanceof Error) {
            response = {
                isError: true,
                error: e.message,
            };
            return response;
        }
    }
};

const sendToken = async (pointInfo: any) => {
    let token;
    let response: Failable<string | undefined, string>;
    try {
        if (pointInfo) {
            token = jwt.sign(
                {
                    pointInfo,
                },
                process.env.SECRET_KEY as string,
                { algorithm: 'HS256', expiresIn: 60 * 10 },
            );
        }
        response = {
            isError: false,
            value: token,
        };
        return response;
    } catch (e) {
        if (e instanceof Error) {
            response = {
                isError: true,
                error: e.message,
            };
            return response;
        }
    }
};

const usePoint = async (token: string, payPoint: any) => {
    let response: Failable<string, string>;

    const verifyToken = (token: string) => {
        if (!process.env.SECRET_KEY) return;
        const decoded = jwt.verify(token as string, process.env.SECRET_KEY, { algorithms: ['HS256'] });
        const stringified = JSON.stringify(decoded);
        const parsed = JSON.parse(stringified).pointInfo;
        const compatible = JSON.stringify(parsed);
        return { parsed, compatible };
    };

    if (!token) {
        response = {
            isError: true,
            error: '토큰이 없습니다',
        };
        throw new Error(response.error);
    }

    const rst = verifyToken(token);
    if (!rst) throw new Error('토큰 검증이 불가능합니다');
    const { parsed, compatible } = rst;
    const result = compatible == JSON.stringify(payPoint);

    if (!result) {
        response = {
            isError: true,
            error: '유효하지 않은 토큰입니다.',
        };
        throw new Error(response.error);
    }
    const usePoint = Object.entries(payPoint);
    const tx = await sequelize.transaction();

    try {
        for (let i = 0; i < usePoint.length; i++) {
            const [result] = await TotalPoint.findAll({
                where: {
                    [Op.and]: [
                        {
                            id: usePoint[i][0],
                        },
                        {
                            point: {
                                [Op.gte]: usePoint[i][1],
                            },
                        },
                    ],
                },
            });
            if (result === undefined) throw new Error();
            const decrement = await TotalPoint.decrement(
                {
                    point: Number(usePoint[i][1]),
                },
                {
                    where: {
                        id: usePoint[i][0],
                    },
                    transaction: tx,
                },
            );
        }
        await tx.commit();
        response = {
            isError: false,
            value: '입력한 포인트 사용 및 차감 완료',
        };
    } catch (e) {
        await tx.rollback();
        response = {
            isError: true,
            error: `입력한 포인트 사용 불가 및 롤백`,
        };
    }
    return response;
};

const getPoint = async (restAPI: any, email: any) => {
    let response: any;
    try {
        const userPoint = await TotalPoint.findOne({
            where: {
                restAPI,
                email,
            },
        });

        response = {
            status: true,
            point: userPoint?.point,
        };
    } catch (e) {
        response = responseObject(false, '포인트를 가져오지 못했습니디.');
    }
    return response;
};

const pointService = {
    checkPoint,
    sendToken,
    usePoint,
    getPoint,
};

export default pointService;
