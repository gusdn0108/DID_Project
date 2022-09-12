import express, { Request, Response } from 'express';
import { Failable, Point } from '../../@types/response';
import jwt from 'jsonwebtoken';
import sequelize from '../../models';
import TotalPoint from '../../models/user/totalPoint.model';
import { Op } from 'sequelize';
const router = express.Router();

router.post('/checkPoint', async (req: Request, res: Response) => {
    const { email } = req.body;
    let response: Failable<Point[], string>;
    try {
        const result = await sequelize.query(`
        SELECT p.id, p.email, p.restAPI, a.appName, p.point 
            FROM point_totals as p 
            LEFT OUTER JOIN apps as a 
                ON p.restAPI = a.restAPI 
            WHERE email = :email`, {
            replacements: { email },
            raw: true,
            model: TotalPoint,
        });

        response = {
            isError: false,
            value: result,
        };
    } catch (e) {
        response = {
            isError: true,
            error: e.message,
        };
    }
    res.json(response);
});

//토큰 생성 후 프론트로 보내기
router.post('/sendToken', async (req: Request, res: Response) => {
    const { pointInfo } = req.body;
    let token;
    if (pointInfo) {
        token = jwt.sign(
            {
                pointInfo,
            },
            process.env.SECRET_KEY as string,
            { algorithm: 'HS256', expiresIn: 60 * 10 },
        );
    }
    const response: Failable<string, string> = {
        isError: false,
        value: token,
    };
    res.json(response);
});

//검증 및 포인트 사용
router.post('/usePoint', async (req: Request, res: Response) => {
    const { token, payPoint } = req.body;
    let response: Failable<string, string>;

    const verifyToken = (token: string) => {
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });
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
    const { parsed, compatible } = verifyToken(token);
    const result = compatible == JSON.stringify(payPoint);

    if (!result) {
        response = {
            isError: true,
            error: '유효하지 않은 토큰입니다.',
        };
        throw new Error(response.error);
    }

    const tx = await sequelize.transaction();
    try {
        for (let i = 0; i < payPoint.length; i++) {
            const [result] = await TotalPoint.findAll({
                where: {
                    [Op.and]: [
                        {
                            id: payPoint[i].id,
                        },
                        {
                            point: {
                                [Op.gte]: payPoint[i].point,
                            },
                        },
                    ],
                },
            });
            if (result === undefined) throw new Error();
            const decrement = await TotalPoint.decrement(
                {
                    point: payPoint[i].point,
                },
                {
                    where: {
                        id: payPoint[i].id,
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
    res.json(response);
});

export default router;
