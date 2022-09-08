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

<<<<<<< HEAD
    const contract = await deployed();
    const result = await contract.methods.getUser(hash).call();

    const gender = result[0];
    const name = result[1];
    const age = result[2];
    const address = result[3];
    const mobile = result[4];
    const userEmail = result[5];

    const isRegistered = await TotalPoint.findOne({
        where : {
            email:userEmail
        }
    })

    if(!isRegistered) {
        res.redirect(`${frontend}/userAppRegister?restAPI=${restAPI}`)
    }

=======
>>>>>>> ed91a3527ae5646860af136fd7c3b7493eeda371
    const dbUser = await VerifyId.findOne({
        where: {
            hashId: {
                [Op.eq]: hash,
            },
        },
    });

    const DID_ACCESS = jwt.sign(
        {
            hashId: hash,
        },
        process.env.SECRET_KEY as string,
    );

    const REFRESH_ACCESS = jwt.sign(
        {
            hashId: hash,
        },
        process.env.SECRET_KEY as string,
    );

    const code = 'test';

    try {
        if (dbUser) {
            await axios.post('http://localhost:4001/api/oauth/getCode', {
                DID_ACCESS,
                REFRESH_ACCESS,
                code,
                restAPI,
                hash,
                email,
                reURL,
            });
        }
    } catch (e) {
        console.log(e.message);
    }

    // redirectURL 검증 추가해야됨
});

router.post('/codeAuthorize', async (req: Request, res: Response) => {
    const { code, restAPI, hash, email, reURL, DID_ACCESS, REFRESH_ACCESS } = req.body;

    const getRestAPI: any = await DataNeeded.findOne({
        where: {
            restAPI: {
                [Op.eq]: restAPI,
            },
        },
    });

    try {
        if (code) {
            const contract = await deployed();
            const VP = await contract.methods.getVP(hash, getRestAPI).call();

            // 객체로 가져와야 함

            let user = {};
            console.log('1');
            Object.entries(getRestAPI.dataValues)
                .filter((v) => v[1] === true)
                .map((v: any) => {
                    user = {
                        ...user,
                        [v[0]]: VP[v[0]],
                    };
                });

            user = {
                ...user,
                hashId: hash,
                email,
            };

            let ACCESS_TOKEN;

            console.log(user);
            if (DID_ACCESS !== undefined) {
                ACCESS_TOKEN = jwt.sign(
                    {
                        user,
                    },
                    process.env.SECRET_KEY as string,
                );
                res.cookie('user', ACCESS_TOKEN);
                res.json({
                    ACCESS_TOKEN,
                });
            } else if (REFRESH_ACCESS !== undefined) {
                const ACCESS_TOKEN = jwt.sign(
                    {
                        user,
                    },
                    process.env.SECRET_KEY as string,
                );
                const DID_ACCESS = jwt.sign(
                    {
                        hashId: hash,
                    },
                    process.env.SECRET_KEY as string,
                );
                res.cookie('user', ACCESS_TOKEN);
                res.cookie('user2', DID_ACCESS);
                res.json({
                    ACCESS_TOKEN,
                    DID_ACCESS,
                });
            }
            res.cookie('firstuser', ACCESS_TOKEN);
            res.json({
                ACCESS_TOKEN,
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/localAuthorize', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userhash = email + password;
    const hash = crypto.createHash('sha256').update(userhash).digest('base64');

    const dbUser = await VerifyId.findOne({
        where: {
            hashId: {
                [Op.eq]: hash,
            },
        },
    });

    if (dbUser) {
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
