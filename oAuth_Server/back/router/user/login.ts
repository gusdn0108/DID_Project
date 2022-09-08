import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import crypto from 'crypto';
import deployed from '../../web3';
import VerifyId from '../../models/user/verifyId.model';
import DataNeeded from '../../models/webSite/dataNeeded.model';
import TotalPoint from '../../models/user/totalPoint.model';
import { frontend } from './utils';

const router = express.Router();

router.post('/authorize', async (req: Request, res: Response) => {
    const { email, password, restAPI, reURL } = req.body;
    const userhash = email + password;
    console.log(email, password, restAPI, reURL);
    const hash = crypto.createHash('sha256').update(userhash).digest('base64');


    const contract = await deployed();
    const result = await contract.methods.getUser(hash).call();

    try {
        if (result) {
            res.redirect(`http://localhost:4001/api/oauth/getCode?email=${email}&hash=${hash}`);
        }
    } catch (e) {
        console.log(e);
    }

    // redirectURL 검증 추가해야됨
});

router.post('/codeAuthorize', async (req: Request, res: Response)=> {
    const MAKE_ACCESS_TOKEN = req.body;
    const EXPIRES_IN = 43199;

    try {
        const ACCESS_TOKEN = jwt.sign(
            {
                MAKE_ACCESS_TOKEN,
                exp: EXPIRES_IN,
            },
            'asdf',
        );

        const response = {
            status: true,
            ACCESS_TOKEN,
        };
        res.json(response);
    } catch (e: any) {
        console.log(e.message);
        const response = { status: false, msg: 'accessToken 생성에러' };
    }
})

router.get('/codeAuthorize2', async (req: Request, res: Response) => {
    const bearer_token: any = req.headers.authorization;
    const bearer_req: string[] = bearer_token.split(' ');
    if (bearer_req[0] == 'Bearer') {
        const decoded_token = Buffer.from(bearer_req[1], 'base64').toString('utf-8');

        const decode1 = decoded_token.split('}');
        const decode2 = JSON.parse(decode1[1] + '}}');

        const decode3 = decode2.MAKE_ACCESS_TOKEN;
        console.log(decode3)
        // clientId, clientSecret,grant_type 확인후
        // 맞는 사용자 정보를 가져다 토큰을 만들어 주면 된다..
        if (decode3.grant_type == 'authorization_code') {
            // 여기선 이렇게 하지만 과제에서는 restapi,client_secret를 다시 한 번 db에서 읽고 확인해야한다.
            const response = {
                userId: 'asdf',
                userPw: '1234',
            };
            // access_token 확인이 끝났다면 블록체인 네트워크에서 필요한 정보만을 읽어온 후,
            // 이걸 객체로 준다.
            res.json(response);
        }
    }
});

// router.post('/codeAuthorize', async (req: Request, res: Response) => {
//     console.log('connect codeAuthorize');
//     console.log('codeAuthorize', req.body);
//     const { code, restAPI, hash, email, reURL, DID_ACCESS, REFRESH_ACCESS } = req.body;

//     const getRestAPI: any = await DataNeeded.findOne({
//         where: {
//             restAPI: {
//                 [Op.eq]: restAPI,
//             },
//         },
//     });

//     try {
//         if (code) {
//             const contract = await deployed();
//             const VP = await contract.methods.getVP(hash, getRestAPI).call();

//             // 객체로 가져와야 함

//             let user = {};
//             console.log('1');
//             Object.entries(getRestAPI.dataValues)
//                 .filter((v) => v[1] === true)
//                 .map((v: any) => {
//                     user = {
//                         ...user,
//                         [v[0]]: VP[v[0]],
//                     };
//                 });

//             user = {
//                 ...user,
//                 hashId: hash,
//                 email,
//             };

//             let ACCESS_TOKEN;

//             console.log('if out');
//             if (DID_ACCESS !== undefined) {
//                 console.log('if 1');
//                 ACCESS_TOKEN = jwt.sign(
//                     {
//                         user,
//                     },
//                     process.env.SECRET_KEY as string,
//                 );
//                 res.cookie('user', ACCESS_TOKEN);
//                 res.json({
//                     ACCESS_TOKEN,
//                 });
//                 //  await axios.post('http://localhost:4001/api/oauth/getToken', ACCESS_TOKEN);
//             } else if (REFRESH_ACCESS !== undefined) {
//                 console.log('if 2');
//                 const ACCESS_TOKEN = jwt.sign(
//                     {
//                         user,
//                     },
//                     process.env.SECRET_KEY as string,
//                 );
//                 const DID_ACCESS = jwt.sign(
//                     {
//                         hashId: hash,
//                     },
//                     process.env.SECRET_KEY as string,
//                 );
//                 res.cookie('user', ACCESS_TOKEN);
//                 res.cookie('user2', DID_ACCESS);
//                 res.json({
//                     ACCESS_TOKEN,
//                     DID_ACCESS,
//                 });
//                 //    await axios.post('http://localhost:4001/api/oauth/getToken', { ACCESS_TOKEN, DID_ACCESS });
//             }
//             console.log('if 3');
//             ACCESS_TOKEN = jwt.sign(
//                 {
//                     user,
//                 },
//                 process.env.SECRET_KEY as string,
//             );
//             //  await axios.post('http://localhost:4001/api/oauth/getToken', { ACCESS_TOKEN });
//             res.cookie('firstuser', ACCESS_TOKEN);
//             res.json({
//                 ACCESS_TOKEN,
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });

router.post('/localAuthorize', async (req: Request, res: Response) => {
    const { email, password } = req.body;
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
    } else {
        res.json({
            status: false,
            msg: '일치하는 아이디가 없습니다',
        });
    }
});

export default router;
