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
 *     description: request user point
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
 *             email:
 *               type: string
 *             restAPI:
 *               type: string
 *             appName:
 *               type: string
 *             point:
 *               type: integer
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
    res.json(response);
});


/**
 * @openapi
 * /Oauth/point/sendPoint:
 *   post:
 *     tag:
 *     -sendPoint
 *     summary: send user's point
 *     description: send usable point
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
    res.json(response);
});


/**
 * @openapi
 * /Oauth/point/usePoint:
 *   post:
 *     tag:
 *     - usePoint
 *     summary: send user's point
 *     description: send user's point
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
