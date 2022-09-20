import express, { Request, Response } from 'express';
import { Failable, Point } from '../../@types/response';
import pointService from '../../services/point/point.service';
const router = express.Router();

/**
 * @openapi
 * paths:
 *  /Oauth/point/checkPoint
 *   post:
 *     tag:
 *     -request user point
 *     summary: request user's point
 *     description: 유저 포인트 조회
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *         description: email for request
 *         schema:
 *           type: string
 *           example: "yellow_w@naver.com"
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     type: object
 *     properties:
 *       isError:
 *         type: boolean
 *       value:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *           email:
 *             type: string
 *           restAPI:
 *             type: string
 *           appName:
 *             type: string
 *           point:
 *             type: integer
 *       error:
 *         type: string
 *     required:
 *     - isError
 */
router.post('/checkPoint', async (req: Request, res: Response) => {
    const { email } = req.body;
    let response: Failable<Point[], string>;
    try {
        response = await pointService.checkPoint(email);
        if(response.isError===true) throw new Error(response.error)
    } catch (e) {
    }
    console.log(response)
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
    console.log(response)

    res.json(response);
});

//검증 및 포인트 사용
router.post('/usePoint', async (req: Request, res: Response) => {
    const { token, payPoint } = req.body;
    let response: Failable<string, string>;
    try {
        response = await pointService.usePoint(token, payPoint);
    } catch (e) {}
    console.log(response)

    res.json(response);
});

export default router;
