import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import deployed from '../../web3';
import VerifyId from '../../models/user/verifyId.model';
import DataNeeded from '../../models/webSite/dataNeeded.model';
import TotalPoint from '../../models/user/totalPoint.model';
import { frontend } from './utils';
import RedirectURI from '../../models/webSite/redirectURI.model';
import { boolToNum, makeRawVP, refineVP, responseObject } from '../app/utils';
import App from '../../models/webSite/app.model';

const router = express.Router();

router.post('/authorize', async (req: Request, res: Response) => {
    const { email, password, restAPI, reURL, giveUserInfo } = req.body;

    const userhash = email + password;
    const hash = crypto.createHash('sha256').update(userhash).digest('base64');

    try{
        const checkRedirectUri = await RedirectURI.findOne({
            where : {
                restAPI: restAPI,
                redirectURI : reURL
            }
        })

        if(!checkRedirectUri) throw new Error('존재하지 않는 어플리케이션 혹은 redirect Uri')

        const contract = await deployed();
        const result = await contract.methods.getUser(hash).call();

        if((result[0] =='' && result[2] == 0)|| email !== result[5]) {
            res.json(responseObject(false, 'id/pw를 확인해주세요'))
            return;
        }

        const isRegistered = await TotalPoint.findOne({
            where : {
                restAPI,
                email
            }
        })

        if(!isRegistered) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            const response = {
                status: 'first',
                registerUri : `http://${frontend}/userAppRegister?email=${email}&restAPI=${restAPI}&redirectUri=${reURL}&hash=${hash}&giveUserInfo=${giveUserInfo}`
            }
            res.json(response)
            return;
        }

        if (result) {
            const sentHash = encodeURIComponent(hash)
            res.redirect(`${reURL}?email=${email}&hash1=${sentHash}`);
        }
        
    }
    catch (e) {
        console.log(e.message);
        res.json(responseObject(false, '비정상적인 접근입니다.'))
    }
});

router.post('/codeAuthorize', async (req: Request, res: Response)=> {
    // accessToken을 검증해줘야 한다.
    const MAKE_ACCESS_TOKEN = req.body;
    
    const EXPIRES_IN = 43199;
    try {

        if(MAKE_ACCESS_TOKEN.grant_type !== 'authorization_code' ) {
            throw new Error ('잘못된 데이터 형식입니다.')
        }
        
        // restAPI에 대응하는 client_secret이 맞는지 확인
        const checkSecretKey = await App.findOne({
            where : {
                restAPI : MAKE_ACCESS_TOKEN.restAPI,
                code : MAKE_ACCESS_TOKEN.client_secret
            }
        })
    
        if(!checkSecretKey) {
            throw new Error ('잘못된 접근입니다.')
        }
        
        const ACCESS_TOKEN = jwt.sign(
            {
                MAKE_ACCESS_TOKEN,
                exp: EXPIRES_IN,
            },
            'asdf',
        )

        const response = {
            status: true,
            ACCESS_TOKEN,
        };

        res.json(response);
    } catch (e: any) {
        console.log(e.message);
        res.json(responseObject(false, e.message))
    }
})

router.get('/codeAuthorize2', async (req: Request, res: Response) => {
    const bearer_token: any = req.headers.authorization;
    const bearer_req: string[] = bearer_token.split(' ');

    try {
        const decoded_token = Buffer.from(bearer_token, 'base64').toString('utf-8');

        const decode1 = decoded_token.split('}');
        const decode2 = JSON.parse(decode1[1] + '}}').MAKE_ACCESS_TOKEN;

        if (decode2.grant_type == 'authorization_code') {

            const getUserInfo = await DataNeeded.findOne({
                where : {
                  restAPI : decode2.restAPI,
                }
            })
        
            const infoArray = [getUserInfo.gender, getUserInfo.name, getUserInfo.age,
                getUserInfo.addr, getUserInfo.mobile, getUserInfo.email]
        
            const reqVP = boolToNum(infoArray)
            
            const contract = await deployed();
            const VP = await contract.methods.getVP(decode2.hash, reqVP).call();

            const rawVP = makeRawVP(VP)
            
            const refinedVP = refineVP(rawVP)

            const response = {
                status: true,
                VP : refinedVP,
                hash : decode2.hash
            }
            res.json(response);
        }
    }
    catch(e) {
        console.log(e.message)
        res.json(responseObject(false, 'access token 검증 실패'))
    }
});

router.post('/localAuthorize', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const userhash = email + password;
        const hash = crypto.createHash('sha256').update(userhash).digest('base64');

            const dbUser = await VerifyId.findOne({
                where:{
                    email: email,
                },
            });

        if(!dbUser) throw new Error('id/pw를 확인해주세요')

        const contract = await deployed();
        const result = await contract.methods.getUser(hash).call();

        if (result) {
            let token = jwt.sign(
                {
                    email: email,
                    hashId: hash,
                },
                process.env.SECRET_KEY as string,
            );
            res.cookie('user', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({
                status: true,
                token: token,
            });
        }
    }
    catch(e) {
        responseObject(false, e.message)
    }
});

export default router;
