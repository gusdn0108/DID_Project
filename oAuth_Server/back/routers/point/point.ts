import express, { Request, Response } from 'express';
import { Failable, Point } from '../../@types/response';
import pointService from '../../services/point/point.service';
const router = express.Router();

router.post('/checkPoint', async (req: Request, res: Response) => {
    const { email } = req.body;
    let response: Failable<Point[], string>;
    try {
        response = await pointService.checkPoint(email);
        if(response.isError===true) throw new Error(response.error)
    } catch (e) {
    }
    res.json(response);
});

//토큰 생성 후 프론트로 보내기
router.post('/sendToken', async (req: Request, res: Response) => {
    const { pointInfo } = req.body;
    let response: Failable<string, string>;
    try {
        response = await pointService.sendToken(pointInfo);
        if (response.isError === true) throw new Error(response.error);
    } catch (e) {}
    res.json(response);
});

//검증 및 포인트 사용
router.post('/usePoint', async (req: Request, res: Response) => {
    const { token, payPoint } = req.body;
    let response: Failable<string, string>;
    try {
        response = await pointService.usePoint(token, payPoint);
    } catch (e) {}
    res.json(response);
});

export default router;
