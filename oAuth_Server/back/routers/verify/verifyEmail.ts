import express, { Request, Response } from 'express';

import verifyService from '../../services/verify/verifyEmail.service';
const router = express.Router();

let response: any;
router.post('/email', async (req: Request, res: Response) => { 
    const { email } = req.body;
    try{
        response = await verifyService.email(email);
        if(response.status !== true) throw new Error(response.msg)
        res.status(201);
    } catch (e){}
    res.json(response);
});

export default router;
