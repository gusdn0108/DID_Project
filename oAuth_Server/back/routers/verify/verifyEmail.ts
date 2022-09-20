import express, { Request, Response } from 'express';

import verifyService from '../../services/verify/verifyEmail.service';
const router = express.Router();

let response: any;

/**
 * @openapi
 * /Oauth/verifyEmail/email:
 *   post:
 *     tag:
 *     - email
 *     summary: verify email
 *     description: verify email for sign up
 *     parameters:
 *       - in: body
 *         name: 'email'
 *         required: true
 *         description: email for verification
 *         schema:
 *           type: string
 *           example: 'yellow_w@naver.com'
 *     responses:
 *       '200':    
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/email'
 *       '404':
 *         description: server error
 * components:
 *   Response:
 *     email:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         number:
 *           type: array
 *           example: [ '8', '4', '5', '4', '5', '8' ]
 *         msg:
 *           type: string
 *       required:
 *       - status
 */
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
