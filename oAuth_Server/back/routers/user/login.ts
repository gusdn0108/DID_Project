import express, { Request, Response } from 'express';
import loginService from '../../services/user/login.service';

const router = express.Router();
let response: any;

/**
 * @openapi
 * /Oauth/login/authorize:
 *   post:
 *     tag:
 *     - authorize
 *     summary: authorize
 *     description: 인가
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         description: object data for token
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *             password:
 *               type: string
 *               example: 'QWERT12345!'
 *             restAPI:
 *               type: string
 *               example: 'af27b2865ab2dd31aeb0c6fbc54a18b'
 *             reURL:
 *               type: string
 *               example: 'http://localhost:3000'
 *             giveUserInfo:
 *               type: array
 *               example: [true,true,false,true,true,false,]
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/authorize'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     authorize:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         registerUri:
 *           type: string
 *           example: 'http://localhost:8080/userAppRegister?email=test@gmail.com&restAPI=af27b2865ab2dd31aeb0c6fbc54a18b&redirectUri=http://localhost:4000/api/Oauth/getCode&hash=hBNh54QTfHT+a5TunScmyjamZKhVsOdRcWMCN3fbT80=&giveUserInfo=http://localhost:4000/api/Oauth/giveUserInfo'
 *         redirectInfo:
 *           type: string
 *           example: 'http://localhost:4000/api/Oauth/getCode?email=test@gmail.com&hash1=yDjrWmU0ZtWIWriqhPQAizW9LxkeuE3XW0cHNQSZ1Ng%3D'
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.post('/authorize', async (req: Request, res: Response) => {
    const { email, password, restAPI, reURL, giveUserInfo } = req.body;
    try {
        response = await loginService.authorize(req.body);
        if (response.response){
            const { key, value } = response.headerINfo;
            res.header(key, value);
            res.json(response.response);
        }
        else if (response.status === false) throw new Error(response.msg)
        else if (response.status === 'redirect') res.redirect(302,response.redirectInfo);
        else res.json(response);
    } catch (e) {
        res.json(response);
    }
});

/**
 * @openapi
 * /Oauth/login/codeAuthorize:
 *   post:
 *     tag:
 *     - authorize
 *     summary: get acess token for authentication
 *     description: get acess token for authentication
 *     parameters:
 *       - in: body
 *         name: MAKE_ACCESS_TOKEN
 *         required: true
 *         description: object data for getting acess token
 *         schema:
 *           type: object
 *           properties:
 *             grant_type:
 *               type: string
 *               example: 'authorization_code'
 *             restAPI:
 *               type: string
 *               example: 'af27b2865ab2dd31aeb0c6fbc54a18b'
 *             client_secret:
 *               type: string
 *               example: 'b303aa3f18d08ff8f36d12a9d8f1085'
 *             redirect:
 *               type: string
 *               example: 'http://localhost:4000/api/Oauth/getCode'
 *             email:
 *               type: string
 *               example: 'test@gmail.com'
 *             hash:
 *               type: string
 *               example: 'yDjrWmU0ZtWIWriqhPQAizW9LxkeuE3XW0cHNQSZ1Ng='
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/codeAuthorize'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     codeAuthorize:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         ACCESS_TOKEN:
 *           type: string
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNQUtFX0FDQ0VTU19UT0tFTiI6eyJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVzdEFQSSI6ImFmMjdiMjg2NWFiMmRkMzFhZWIwYzZmYmM1NGExOGIiLCJjbGllbnRfc2VjcmV0IjoiYjMwM2FhM2YxOGQwOGZmOGYzNmQxMmE5ZDhmMTA4NSIsInJlZGlyZWN0IjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2FwaS9PYXV0aC9nZXRDb2RlIiwiZW1haWwiOiJmZmZmQGdtYWlsLmNvbSIsImhhc2giOiJ5RGpyV21VMFp0V0lXcmlxaFBRQWl6VzlMeGtldUUzWFcwY0hOUVNaMU5nPSJ9LCJleHAiOjQzMTk5LCJpYXQiOjE2NjM2OTEwMTV9.jYX0nX4MzFRy0bGDtspff_u5MNxyWCCTPzNRp4sfh0Y'
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.post('/codeAuthorize', async (req: Request, res: Response) => {
    // accessToken을 검증해줘야 한다.
    const MAKE_ACCESS_TOKEN = req.body;
    try {
        response = await loginService.codeAuthorize(MAKE_ACCESS_TOKEN);
        if(response.status !== true) throw new Error(response.msg)
    } catch (e) {}
    res.json(response);
});

/**
 * @openapi
 * /Oauth/login/codeAuthorize2:
 *   post:
 *     tag:
 *     - codeAuthorize2
 *     summary: get vp
 *     description: get vp for suitable web site
 *     parameters:
 *       - in: body
 *         name: ''
 *         required: true
 *         description: token data for getting VP
 *         schema:
 *           type: object
 *           properties:
 *             bearer_token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNQUtFX0FDQ0VTU19UT0tFTiI6eyJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVzdEFQSSI6ImFmMjdiMjg2NWFiMmRkMzFhZWIwYzZmYmM1NGExOGIiLCJjbGllbnRfc2VjcmV0IjoiYjMwM2FhM2YxOGQwOGZmOGYzNmQxMmE5ZDhmMTA4NSIsInJlZGlyZWN0IjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2FwaS9PYXV0aC9nZXRDb2RlIiwiZW1haWwiOiJmZmZmQGdtYWlsLmNvbSIsImhhc2giOiJ5RGpyV21VMFp0V0lXcmlxaFBRQWl6VzlMeGtldUUzWFcwY0hOUVNaMU5nPSJ9LCJleHAiOjQzMTk5LCJpYXQiOjE2NjM2OTI5MTd9.1hvXVz7_7YHnoeksv7fu8oHvVPduoEgBKlGC7xjrN-E'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/codeAuthorize2'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     codeAuthorize2:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         VP:
 *           type: array
 *           example: [{ att: 'name', value: '노랑이' },{ att: 'mobile', value: '01012341234' },{ att: 'email', value: 'test@gmail.com' }]
 *         hash:
 *           type: string
 *           example: 'yDjrWmU0ZtWIWriqhPQAizW9LxkeuE3XW0cHNQSZ1Ng='
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.get('/codeAuthorize2', async (req: Request, res: Response) => {
    const bearer_token: any = req.headers.authorization;
    try {
        response = await loginService.codeAuthorize2(bearer_token);
        if(response.status !==true )throw new Error(response.msg);
    } catch (e) {}
    res.json(response);
});

/**
 * @openapi
 * /Oauth/login/localAuthorize:
 *   post:
 *     tag:
 *     -localAuthorize
 *     summary: sign in Oauth web site
 *     description: sign in Oauth web site
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         description: object data for sign in
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "test@gmail.com"
 *             password:
 *               type: string
 *               example: 'QWERT12345!'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/localAuthorize'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     localAuthorize:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         token:
 *           type: string
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZmZmZAZ21haWwuY29tIiwiaGFzaElkIjoieURqcldtVTBadFdJV3JpcWhQUUFpelc5THhrZXVFM1hXMGNITlFTWjFOZz0iLCJpYXQiOjE2NjM2OTQxNTh9.1SRUKTx1x92MvHxc2jo95_u1EsZJ5AUZfeCQ-_oeUYo'
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
router.post('/localAuthorize', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        response = await loginService.localAuthorize(email, password);
        if (response.response) {
            const { key, value, options } = response.cookieInfo;
            res.cookie(key, value, options);
            res.json(response.response);
        }
        else if (response.status !== true) throw new Error(response.msg)
        else res.json(response)
    } catch (e) {
        res.json(response);
    }
});

export default router;
