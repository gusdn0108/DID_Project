import express, { Request, Response } from 'express';
import { IResponse_App } from '../../@types/response';
import appService from '../../services/app/app.service';

const router = express.Router();
const MAX_REDIRECT_URI_NUM = 5;
let response: IResponse_App;

/**
 * @openapi
 * /Oauth/app/apiDistribution: 
 *   post:
 *     tag:
 *     - call_my_app
 *     summary: transfer data of applications
 *     description: 어플리케이션에 부여할 restAPI, client_secret 코드 생성
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: application owner's email
 *         schema:
 *            type: object
 *            properties:
 *              email:
 *                  type: string
 *                  example: 'test@gmail.com'
 *              appName:
 *                  type: string
 *                  example: 'localB'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/apiDistribution'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     apiDistribution:
 *      type: object
 *      properties:
 *       status:
 *         type: boolean
 *         example : true
 *       msg:
 *         type: string
 *         example : '성공적으로 등록되었습니다.'
 *       REST_API:
 *          type : string
 *          example : "ed2bddf3ece5bf7bf4fd134c1fad973"
 *     required:
 *     - status
 */


router.post('/apiDistribution', async (req: Request, res: Response) => {
    const { appName, email } = req.body;
    try {
        response = await appService.apiDistribution(appName, email);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 * /Oauth/app/getMyApp: 
 *   post:
 *     tag:
 *     - call_my_app
 *     summary: transfer data of applications
 *     description: 사용자가 관리하는 어플리케이션 리스트 출력
 *     parameters:
 *       - in: body
 *         name: ""
 *         required: true
 *         description: application owner's email
 *         schema :
 *           type : object
 *           properties:
 *             email :
 *               type : string
 *               example : 'test@gmail.com'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/getMyApp'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     getMyApp:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example : true
 *         myapp:
 *           type: array
 *           example : ['localB', 'testApp']
 *       required:
 *       - status
 */

router.post('/getMyApp', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        response = await appService.getMyApp(email);
        console.log(response)
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/deleteApp:
 *   post:
 *     tag:
 *     - delete, application
 *     summary: delete selected application
 *     description: 사용자가 관리 중인 어플리케이션 연동 해제
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: object
 *           properties:
 *             restAPI : 
 *               type : string
 *               example : "466192a1fbd26edef63c3e66ab7e3a1"
 *             client_secret :
 *               type : string
 *               example : "334a854e6e4ec109d78c72a2a34f18c"
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/deleteApp'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     deleteApp:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *           example: '어플리케이션이 삭제되었습니다.'
 *       required:
 *       - status
 */

router.post('/deleteApp', async (req: Request, res: Response) => {
    const { restAPI, client_secret } = req.body;
    try {
        response = await appService.deleteApp(restAPI, client_secret);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/appInfo:
 *   post:
 *     tag:
 *     - call, application
 *     summary: load selected application's information
 *     description: 어플리케이션의 정보 출력
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: object
 *           properties:
 *             restAPI:
 *               type: string
 *               example: '9474c4dbad6a0557192f9a5969285a1'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     type: 
 *     properties:
 *       status:
 *         type: boolean
 *         example : true
 *       result:
 *         type: object 
 *         example : { email : 'test@gmail.com', appName : 'testApp', client_secret: 'ed2bddf3ece5bf7bf4fd134c1fad973', redirectURI: "http://localhost:4001/api/oauth/getCode", restAPI : '9474c4dbad6a0557192f9a5969285a1', neededInfo : [{att : 'name', get : true}, {att : 'email', get : true}, {att : 'gender', get : true}, {att : 'age', get : true}, { att: 'address', get : true}, {att : 'mobile', get : true}]}
 *     required:
 *     - status

 */

router.use('/appInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.body;
    try {
        response = await appService.appInfo(restAPI);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/getInfoUpdate:
 *   post:
 *     tag:
 *     - modify, application
 *     summary: select information provided
 *     description: 사용자에게 제공 받을 정보 항목을 관리, 변경
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: 사용자에게 제공받을지의 여부를 boolean으로 저장
 *         schema:
 *           type: object
 *           properties :
 *              getUserInfo :
 *                  type : array
 *                  example : [true, false, true, true, false, false]
 *              restAPI :
 *                  type : string
 *                  example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/getInfoUpdate'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     getInfoUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *           example: '정상적으로 반영되었습니다.'
 *       required:
 *       - status
 */

router.use('/getInfoUpdate', async (req: Request, res: Response) => {
    const { getUserInfo, restAPI } = req.body;
    try {
        response = await appService.getInfoUpdate(getUserInfo, restAPI);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/updateRedirect:
 *   post:
 *     tag:
 *     - modify, redirectURI, application
 *     summary: save redirectURI
 *     description: sso 로그인시 사용할 리다이렉트 uri 관리
 *     parameters:
 *       - in: body
 *         name : ''
 *         required: true
 *         description: sso 로그인시 사용할 리다이렉트 uri 관리
 *         schema:
 *           type: object
 *           properties : 
 *              uris :
 *                  type: array
 *                  example : ['http://localhost:4001','http://localhost:4000','http://localhost:4000','http://localhost:4000','http://localhost:4000']
 *              restAPI : 
 *                type : string
 *                example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/updateRedirect'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     updateRedirect:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *           example: '정상적으로 반영되었습니다.'
 *       required:
 *       - status
 */

router.post('/updateRedirect', async (req: Request, res: Response) => {
    const { uris, restAPI } = req.body;
    try {
        response = await appService.updateRedirect(uris, restAPI);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/giveUserInfo:
 *   get:
 *     tag:
 *     - VP, application, userInfo
 *     summary: sned list of needed information
 *     description: 연동 어플리케이션이 제공받는 정보를 체크 후, 리스트 생성
 *     parameters:
 *       - in: query
 *         name : restAPI
 *         type : string
 *         required: true
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/giveUserInfo'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     giveUserInfo:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         appName:
 *           type: string
 *           example: 'testApp'
 *         infos :
 *           type : [{att : 'email', value : true}, {att : 'name', value: 'true'}]
 *       required:
 *       - status
 */

router.get('/giveUserInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.query;

    try {
        response = await appService.giveUserInfo(restAPI);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/userdidregister:
 *   post:
 *     tag:
 *     - register, did, application
 *     summary: sync user with specific application
 *     description: 사용자를 어플리케이션 SSO 기능에 연동
 *     parameters:
 *       - in: body
 *         required: true
 *         description: information of application, user
 *         schema:
 *           type: object
 *           properties : 
 *              email :
 *                  type: string
 *                  example : "619049@naver.com"
 *              restAPI :
 *                type : string
 *                example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *              point :
 *                type : integer
 *                example: "50000"
 *              hash :
 *                type : string
 *                example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *              giveUserInfo :
 *                type : array
 *                example : [true, false, true, false, true, false]     
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/userdidregister'
 *       '404':
 *         description: uri not found.
 * components:
 *   Response:
 *     userdidregister:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         msg:
 *           type: string
 *           example: '정상적으로 등록되었습니다. 다시 로그인해주세요.'
 *       required:
 *       - status
 */

router.post('/userdidregister', async (req: Request, res: Response) => {
    // const { restAPI, email, point, hash, giveUserInfo } = req.body;
    try {
        response = await appService.userdidregister(req.body);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

/**
 * @openapi
 *  /Oauth/app/getPoint:
 *   get:
 *     tag:
 *     -user, point, application
 *     summary: load user's point
 *     description: 사용자의 포인트 정보를 전송
 *     parameters:
 *       - in: query
 *         name : restAPI
 *         type : string
 *         example : 
 *         required: true
 *       - in : query
 *         name : email
 *         type : string
 *         example : 
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

// router.get('/getPoint', async (req: Request, res: Response) => {
//     const { restAPI, email } = req.query;
//     try {
//         response = await appService.getPoint(restAPI, email);
//         if (response.status !== true) throw new Error(response.msg);
//     } catch (e) {
//         if (e instanceof Error) console.log(e.message);
//     }
//     res.json(response);
// });

export default router;
