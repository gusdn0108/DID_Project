import express, { Request, Response } from 'express';
import loginService from '../../services/user/login.service';

const router = express.Router();
let response: any;

router.post('/authorize', async (req: Request, res: Response) => {
    const { email, password, restAPI, reURL, giveUserInfo } = req.body;
    try {
        response = await loginService.authorize(req.body);
        if (response.status === false) throw new Error(response.msg);
        if (response.status === 'first') {
            const { key, value } = response.headerINfo;
            res.header(key, value);
            res.json(response.response);
        }
        if (response.status === 'redirect'){
            res.redirect(response.redirectInfo);
        }
    } catch (e) {
        res.json(response);
    }
});

router.post('/codeAuthorize', async (req: Request, res: Response) => {
    // accessToken을 검증해줘야 한다.
    const MAKE_ACCESS_TOKEN = req.body;
    try {
        response = await loginService.codeAuthorize(MAKE_ACCESS_TOKEN);
        if(response.status !== true) throw new Error(response.msg)
    } catch (e) {}
    res.json(response);
});

router.get('/codeAuthorize2', async (req: Request, res: Response) => {
    const bearer_token: any = req.headers.authorization;
    const bearer_req: string[] = bearer_token.split(' ');
    try {
        response = await loginService.codeAuthorize2(bearer_token);
        if(response.status !==true )throw new Error(response.msg);
    } catch (e) {}
    res.json(response);
});

router.post('/localAuthorize', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        response = await loginService.localAuthorize(email, password);
        if(response.response.status ===false ) throw new Error(response.msg)
        const {key, value, options} = response.cookieInfo
        res.cookie(key, value, options)
        res.json(response.response)
    } catch (e) {}
});

export default router;
