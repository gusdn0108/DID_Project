import express, { Request, Response } from 'express';
import { IResponse_App } from '../../@types/response';
import appService from '../../services/app/app.service';

const router = express.Router();
const MAX_REDIRECT_URI_NUM = 5;
let response: IResponse_App;


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
 * paths:
 *  /Oauth/app/getMyApp
 *   post:
 *     tag:
 *     - call, application
 *     summary: transfer data of applications
 *     description: Optional 디스크립션
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *         description: application owner's email
 *         schema:
 *           type: string
 *           example: "test@gmail.com"
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
 *     type: array
 *     properties:
 *       status:
 *         type: boolean
 *       myapp:
 *         type: array
 *     required:
 *     - status
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
 * paths:
 *  /Oauth/app/deleteMyApp
 *   post:
 *     tag:
 *     - delete, application
 *     summary: delete selected application
 *     description: stop syncing user's application
 *     parameters:
 *       - in: body
 *         name: restAPI
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: string
 *           example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *         - in: body
 *         name: client_secret
 *         required: true
 *         description: client_secret code
 *         schema:
 *           type: string
 *           example: "ed2bddf3ece5bf7bf4fd134c1fad973"
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
 *       msg:
 *         type: string
 *     required:
 *     - status
 * -msg
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
 * paths:
 *  /Oauth/app/appInfo
 *   post:
 *     tag:
 *     - call, application
 *     summary: load selected application's information
 *     description: same as summary
 *     parameters:
 *       - in: body
 *         name: restAPI
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: string
 *           example: "ed2bddf3ece5bf7bf4fd134c1fad973"
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
 *       result:
 *         type: object
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
 * paths:
 *  /Oauth/app/getInfoUpdate
 *   post:
 *     tag:
 *     - modify, application
 *     summary: select information provided
 *     description: select needed data
 *     parameters:
 *       - in: body
 *         name: restAPI
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: string
 *           example: "ed2bddf3ece5bf7bf4fd134c1fad973"
 *        - in: body
 *         name: getUserInfo
 *         required: true
 *         description: select which information to be provided
 *         schema:
 *           type: array
 *           example: [1,0,0,0,1,1]
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
 *       msg:
 *         type: string
 *     required:
 *     - status
 *     - string
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
 * paths:
 *  /Oauth/app/updateRedirect
 *   post:
 *     tag:
 *     - modify, redirectURI, application
 *     summary: save redirectURI
 *     description: select needed data
 *     parameters:
 *       - in: body
 *         required: true
 *         description: application's restAPI
 *         schema:
 *           type: object
 *           properties : 
 *              uris : string[]
 *           example :
 *              []
 *              restAPI : string
 *            
 *              
 *              "ed2bddf3ece5bf7bf4fd134c1fad973"

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
 *       msg:
 *         type: string
 *     required:
 *     - status
 *     - string
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

router.get('/getPoint', async (req: Request, res: Response) => {
    const { restAPI, email } = req.query;
    try {
        response = await appService.getPoint(restAPI, email);
        if (response.status !== true) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

export default router;
