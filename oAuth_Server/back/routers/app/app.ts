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
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.post('/getMyApp', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        response = await appService.getMyApp(email);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.post('/deleteApp', async (req: Request, res: Response) => {
    const { restAPI, client_secret } = req.body;
    try {
        response = await appService.deleteApp(restAPI, client_secret);
        //

        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.use('/appInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.body;
    try {
        response = await appService.appInfo(restAPI);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.use('/getInfoUpdate', async (req: Request, res: Response) => {
    const { getUserInfo, restAPI } = req.body;
    try {
        response = await appService.getInfoUpdate(getUserInfo, restAPI);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.post('/updateRedirect', async (req: Request, res: Response) => {
    const { uris, restAPI } = req.body;
    try {
        response = await appService.updateRedirect(uris, restAPI);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.get('/giveUserInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.query;

    try {
        response = await appService.giveUserInfo(restAPI);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.post('/userdidregister', async (req: Request, res: Response) => {
    // const { restAPI, email, point, hash, giveUserInfo } = req.body;
    try {
        response = await appService.userdidregister(req.body);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

router.get('/getPoint', async (req: Request, res: Response) => {
    const { restAPI, email } = req.query;
    try {
        response = await appService.getPoint(restAPI, email);
        if (response.status === false) throw new Error(response.msg);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
    res.json(response);
});

export default router;
