import express, { Request, Response } from 'express';
import { Failable, Point } from '../../@types/response';
import pointService from '../../services/point/point.service';
const router = express.Router();

/**
 * @openapi
 * /Oauth/point/checkPoint:
 *   post:
 *     tag:
 *     - checkPoint
 *     summary: request user's point
 *     description: 유저가 보유하고 있는 포인트 정보 조회
 *     parameters:
 *       - in: body
 *         required: true
 *         description: email for request
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: test@gmail.com
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/checkPoint'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     checkPoint:
 *       type: object
 *       properties:
 *         isError:
 *           type: boolean
 *         value:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             email:
 *               type: string
 *               example: test@gmail.com
 *             restAPI:
 *               type: string
 *               example: af27b2865ab2dd31aeb0c6fbc54a18b
 *             appName:
 *               type: string
 *               example: '경일투어'
 *             point:
 *               type: integer
 *               example: 50000
 *         error:
 *           type: string
 *       required:
 *       - isError
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

/**
 * @openapi
 * /Oauth/point/sendPoint:
 *   post:
 *     tag:
 *     -sendPoint
 *     summary: send user's point
 *     description: 가용포인트에 대한 토큰 전송
 *     parameters:
 *       - in: body
 *         name: PointInfo
 *         required: true
 *         description: point information for use
 *         schema:
 *           type: obejct
 *           example: { '1' : '8900' }
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/sendPoint'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     sendPoint:
 *       type: object
 *       properties:
 *         isError:
 *           type: boolean
 *         value:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2ludEluZm8iOnsiMSI6Ijg5MDAifSwiaWF0IjoxNjYzNjc1MDg1LCJleHAiOjE2NjM2NzU2ODV9.4S_NvC58-IVZ04EEiozy4apC8s7t4XgpYhXmzqpiOao
 *         error:
 *           type: string
 *       required:
 *       - isError
 */
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


/**
 * @openapi
 * /Oauth/point/usePoint:
 *   post:
 *     tag:
 *     - usePoint
 *     summary: send user's point
 *     description: 포인트 사용에 관한 토큰 검증 및 정보 일치 시 포인트 사용
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: object data for using poing
 *         schema:
 *           type: obejct
 *           properties:
 *             token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2ludEluZm8iOnsiMSI6Ijg5MDAifSwiaWF0IjoxNjYzNjc1MDg1LCJleHAiOjE2NjM2NzU2ODV9.4S_NvC58-IVZ04EEiozy4apC8s7t4XgpYhXmzqpiOao'
 *           pointInfo:
 *             type: string
 *             example: { '1' : '8900' }
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/usePoint'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     usePoint:
 *       type: object
 *       properties:
 *         isError:
 *           type: boolean
 *         msg:
 *           type: string
 *           example: '입력한 포인트 사용 및 차감 완료'
 *         error:
 *           type: string
 *           example: '입력한 포인트 사용 불가 및 롤백'
 *       required:
 *       - isError
 */
router.post('/usePoint', async (req: Request, res: Response) => {
    const { token, payPoint } = req.body;
    console.log(token, payPoint)
    let response: Failable<string, string>;
    try {
        response = await pointService.usePoint(token, payPoint);
    } catch (e) {}
    console.log(response)
    res.json(response);
});

export default router;
