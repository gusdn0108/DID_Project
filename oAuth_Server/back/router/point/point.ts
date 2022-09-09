import express, { Request, Response } from 'express';
import { Failable, Failure, Point, Result } from '../../@types/response';
import jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '../../models';
import TotalPoint from '../../models/user/totalPoint.model';
import App from '../../models/webSite/app.model';
import { stringify } from 'querystring';

const router = express.Router();

router.post('/checkPoint', async (req: Request, res: Response) => {
    const { email } = req.body;
    let response: Failable<Point[], string>;
    try {
        const result = await sequelize.query(`select * from point_totals where email = :email`, {
            replacements: { email },
            raw: true,
            model: TotalPoint,
        });
        response = {
            isError: false,
            value: result,
        };
    } catch (e) {
        console.log(e.message);
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

    const verifyToken = (token: string) => {
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });
        const stringified = JSON.stringify(decoded);
        const parsed = JSON.parse(stringified).pointInfo;
        const compatible = JSON.stringify(parsed);
        return {parsed, compatible};
    }

    if(token){
        const {parsed, compatible} = await verifyToken(token)
        const result = (compatible == JSON.stringify(payPoint))
        console.log(result)
    }

    // 쿼리문 작성해야됨
    // const tx = await sequelize.transaction();

    // try{

    // } catch (e) {

    // }
});

export default router;
