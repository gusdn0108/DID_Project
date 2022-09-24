import express, { Request, Response } from 'express';
import userService from '../../services/user/user.service';

const router = express.Router();
let response: any;

/**
 * @openapi
 * /Oauth/user/oAuthRegister:
 *   post:
 *     tag:
 *     - oAuthRegister
 *     summary: sign up for use
 *     description: DID 서비스 사용을 위한 Oauth 사이트 회원가입
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: object data for sign up
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *             gender:
 *               type: string
 *               example: 'm'
 *             name:
 *               type: string
 *               example: '노랑이'
 *             age:
 *               type: integer
 *               example: 20
 *             addr:
 *               type: string
 *               example: '서울시 강동구 천호대로 998 금복빌딩 경일아카데미'
 *             mobile:
 *               type: string
 *               example: '01012341234'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/oAuthRegister'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     oAuthRegister:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         value:
 *           type: string
 *           example: '회원 가입이 완료되었습니다.'
 *       required:
 *       - status
 */
router.post('/oAuthRegister', async (req: Request, res: Response) => {
    const { email, password, gender, name, age, addr, mobile } = req.body;
    try {
        response = await userService.oAuthRegister(req.body);
        if(response.status !==true ) throw new Error(response.msg);
    } catch (e) {}
    res.json(response);
});

/**
 * @openapi
 * /Oauth/user/upDatePassword:
 *   post:
 *     tag:
 *     - upDatePassword
 *     summary: update password
 *     description: 비밀번호 변경
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: password data for update password
 *         schema:
 *           type: object
 *           properties:
 *             hashId:
 *               type: string
 *               example: 'hBNh54QTfHT+a5TunScmyjamZKhVsOdRcWMCN3fbT80='
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *             newPw:
 *               type: string
 *               example: 'QWERT54321!'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/upDatePassword'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     upDatePassword:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *           example: '비밀번호가 변경되었습니다.'
 *       required:
 *       - status
 */
router.post('/upDatePassword', async (req: Request, res: Response) => {
    const { hashId, email, newPw } = req.body;
    console.log(req.body)
    try {
        response = await userService.upDatePassword(req.body);
        if(response.status !== true) throw new Error(response.msg);
    } catch (e) {}
    res.json(response)
});

/**
 * @openapi
 * /Oauth/user/upDateUser:
 *   post:
 *     tag:
 *     - upDateUser
 *     summary: update user information
 *     description: 유저 정보 변경
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: object data for update user information
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *             gender:
 *               type: string
 *               example: 'f'
 *             name:
 *               type: string
 *               example: '노랑이'
 *             age:
 *               type: integer
 *               example: 20
 *             addr:
 *               type: string
 *               example: '서울시 강동구 천호대로 998 금복빌딩 경일아카데미'
 *             mobile:
 *               type: string
 *               example: '01012346789'
 *             hashId:
 *               type: string
 *               example: 'hBNh54QTfHT+a5TunScmyjamZKhVsOdRcWMCN3fbT80='
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/upDateUser'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     upDateUser:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         name:
 *           type: string
 *           example: '노랑이'
 *         age:
 *           type: integer
 *           example: 20
 *         gender:
 *           type: string
 *           example: 'm'
 *         addr:
 *           type: string
 *           example: '서울시 강동구 천호대로 998 금복빌딩 경일아카데미'
 *         mobile:
 *           type: string
 *           example: '01012345678'
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.post('/upDateUser', async (req: Request, res: Response) => {
    const { gender, name, age, addr, mobile, email, hashId } = req.body;
    try {
        response = await userService.upDateUser(req.body);
        if(response.status !== true) throw new Error(response.msg);
    } catch (e) {}
    res.json(response)
});

/**
 * @openapi
 * /Oauth/user/searchUser:
 *   post:
 *     tag:
 *     - searchUser
 *     summary: get user information
 *     description: 프로필 페이지 출력을 위한 유저 정보 조회
 *     parameters:
 *       - in: body
 *         name: 'hashId'
 *         required: true
 *         description: hashId for get user information
 *         schema:
 *           type: object
 *           properties:
 *             hashId:
 *               type: string
 *               example: 'hBNh54QTfHT+a5TunScmyjamZKhVsOdRcWMCN3fbT80='
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/searchUser'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     searchUser:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         name:
 *           type: string
 *           example: '노랑이'
 *         age:
 *           type: integer
 *           example: 20
 *         gender:
 *           type: string
 *           example: 'm'
 *         addr:
 *           type: string
 *           example: '서울시 강동구 천호대로 998 금복빌딩 경일아카데미'
 *         mobile:
 *           type: string
 *           example: '01012345678'
 *         msg:
 *           type: string
 *           example: '회원 가입에 실패했습니다.'
 *       required:
 *       - status
 */
router.post('/searchUser', async (req: Request, res: Response) => {
    const { hashId } = req.body;
    console.log(hashId)
    try {
        response = await userService.searchUser(hashId);
        if(response.status !== true) throw new Error(response.msg);
    } catch (e) {}
    res.json(response)
});

/**
 * @openapi
 * /Oauth/user/deleteUser:
 *   post:
 *     tag:
 *     - deleteUser
 *     summary: delete user information 
 *     description: 유저 정보 삭제
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: hashId and email for delete user
 *         schema:
 *           type: object
 *           properties:
 *             hashId:
 *               type: string
 *               example: 'hBNh54QTfHT+a5TunScmyjamZKhVsOdRcWMCN3fbT80='
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/deleteUser'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     deleteUser:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.post('/deleteUser', async (req: Request, res: Response) => {
    const { hashId, email } = req.body;
    try {
        response = await userService.deleteUser(hashId, email);
        if(response.status !== true) throw new Error(response.msg);
    } catch (e) {}
    res.json(response)
});

export default router;
