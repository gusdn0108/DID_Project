import express, { Request, Response } from 'express';
import { Failable, Point } from '../../@types/response';
import pointService from '../../services/point/point.service';
const router = express.Router();
let response: Failable<Point[], string> | Failable<string, string>;

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
 *           example: '유저정보가 없습니다'
 *       required:
 *       - isError
 */
router.post('/checkPoint', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        response = (await pointService.checkPoint(email)) as Failable<Point[], string>;
        if (response.isError === true) throw new Error(response.error);
    } catch (e) {}
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
    try {
        response = (await pointService.sendToken(pointInfo)) as Failable<string, string>;
        if (response.isError === true) throw new Error(response.error);
    } catch (e) {}
    console.log(response);

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
 *         name: 'token'
 *         type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2ludEluZm8iOnsiMSI6Ijg5MDAifSwiaWF0IjoxNjYzNjc1MDg1LCJleHAiOjE2NjM2NzU2ODV9.4S_NvC58-IVZ04EEiozy4apC8s7t4XgpYhXmzqpiOao'
 *         required: true
 *         description: object data for using poing
 *         schema:
 *           type: obejct
 *           properties:
 *             token:
 *               type: string
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
    try {
        response = await pointService.usePoint(token, payPoint);
    } catch (e) {}
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/point/getPoint:
 *   get:
 *     tag:
 *     -user, point, application
 *     summary: load user's point
 *     description: 사용자의 포인트 정보를 전송
 *     parameters:
 *       - in: query
 *         name : restAPI
 *         type : string
 *         example : 'af27b2865ab2dd31aeb0c6fbc54a18b'
 *         required: true
 *       - in : query
 *         name : email
 *         type : string
 *         example : 'test@gmail.com'
 *         required : true
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/getPoint'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     getPoint:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: integer
 *           example: 50000
 *       required:
 *       - status
 */
router.get('/getPoint', async (req: Request, res: Response) => {
    let response: any;
    const { restAPI, email } = req.query;
    try {
        response = await pointService.getPoint(restAPI, email);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

export default router;
