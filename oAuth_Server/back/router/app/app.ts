import express, { Request, response, Response } from 'express';
import crypto from 'crypto';
import App from '../../models/webSite/app.model';
import DataNeeded from '../../models/webSite/dataNeeded.model';
import RedirectURI from '../../models/webSite/redirectURI.model';
import {makeRedirectUriList, generateHash, responseObject, infoStringToBool, noWhiteSpace, filterNull, insertNewUri, filterNotNeeded} from './utils';
import TotalPoint from '../../models/user/totalPoint.model';

const router = express.Router();
const MAX_REDIRECT_URI_NUM = 5

router.post('/apiDistribution', async (req: Request, res: Response) => {
    const { appName, email } = req.body;

    const AppCodes = generateHash(appName, email);
    const restAPI = AppCodes[0];

    try {
        const exAppName = await App.findOne({
            where: {
                appName,
            },
        });

        if (exAppName) {
            res.json(responseObject(false, '이미 사용중인 이름입니다.'));
        }

        await App.create({
            owner: email,
            appName,
            restAPI: restAPI,
        });

        await DataNeeded.create({
            restAPI: restAPI,
            owner: email,
            email: false,
            name: false,
            gender: false,
            age: false,
            addr: false,
            mobile: false,
        });

        res.json({
            status: true,
            msg: '성공적으로 등록되었습니다.',
            REST_API: restAPI,
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json(responseObject(false, '등록 실패'));
    }
});

router.post('/getMyApp', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const myAppName = await App.findAll({
            where: {
                owner: email,
            },
        });
        res.json({
            status: true,
            myapp: myAppName,
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json(responseObject(false, '비정상적 접근입니다.'));
    }
});

router.use('/appInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.body;

    try {
        const urlInfo = await RedirectURI.findAll({
            where: {
                restAPI,
            },
        });
        const appInfo = await App.findOne({
            where: {
                restAPI,
            },
        });
        const neededInfo = await DataNeeded.findOne({
            where: {
                restAPI,
            },
        });

        const tempUri = makeRedirectUriList(MAX_REDIRECT_URI_NUM)

        for(let i = 0; i<urlInfo.length; i++) {
            tempUri[i] = urlInfo[i].redirectURI
        }

        const result = {
            email: appInfo?.owner,
            appName: appInfo?.appName,
            redirectURI: tempUri,
            restAPI,
            neededInfo: [
                { att: 'name', get: neededInfo?.name },
                { att: 'email', get: neededInfo?.email },
                { att: 'gender', get: neededInfo?.gender },
                { att: 'age', get: neededInfo?.age },
                { att: 'address', get: neededInfo?.addr },
                { att: 'mobile', get: neededInfo?.mobile },
            ],
        };
        res.json({
            status: true,
            result,
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json(responseObject(false, '비정상적 접근이 감지되었습니다.'));
    }
});

router.use('/getInfoUpdate', async (req: Request, res: Response) => {
    const { getUserInfo, restAPI } = req.body;
    const newGetInfo = infoStringToBool(getUserInfo);

    try {
        await DataNeeded.update(
            {
                name: newGetInfo[0],
                email: newGetInfo[1],
                gender: newGetInfo[2],
                age: newGetInfo[3],
                addr: newGetInfo[4],
                mobile: newGetInfo[5],
            },
            {
                where: {
                    restAPI,
                },
            },
        );

        res.json(responseObject(true, '정상적으로 반영되었습니다'));
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json(responseObject(false, '서버 에러, 나중에 다시 시도해주세요.'));
    }
});

router.post('/updateRedirect', async (req: Request, res: Response) => {
    const { uris, restAPI } = req.body;

    const uri = noWhiteSpace(uris)

    try {
        const oldRedirectURI = await RedirectURI.destroy({
            where : {
                restAPI
            }
        })

        const newRedirectUri = filterNull(uri)

        insertNewUri(restAPI, newRedirectUri)

        res.json(responseObject(true, '리다이렉트 url 수정이 완료되었습니다.'));
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json(responseObject(false, '서버 에러'));
    }
});

router.get('/giveUserInfo', async (req:Request, res : Response) => {
    const { restAPI } = req.query
    
    try {

        const appName = await App.findOne({
            where : {
                restAPI
            }
        })

        const infoReq = await DataNeeded.findOne({
            where : {
                restAPI
            }
        })

        if(!infoReq) {
            throw new Error('비정상적인 접근입니다.')
        }

        let infos = [ 
            {att : 'email' , value:infoReq.email},
            {att : 'name' , value: infoReq.name},
            {att : 'age', value: infoReq.age},
            {att : 'gender', value : infoReq.gender},
            {att : 'mobile', value : infoReq.mobile},
            {att : 'addr', value : infoReq.addr} 
        ]

        const filteredInfos = filterNotNeeded(infos)

        const response = {
            status: true,
            appName: appName.appName,
            infos: filteredInfos
        }

        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        res.json(responseObject(false, '비정상적인 접근입니다.'))
    }
})

router.post('/userdidregister', async (req, res) => {
    const { restAPI, email, point } = req.body
    console.log(restAPI, email, point)
    try{
        const ifUser = await TotalPoint.findOne({
            where : {
                hashId : email,
                restAPI 
            }
        })

        if(ifUser) throw new Error('이미 가입된 사용자입니다.')

        const syncUser = await TotalPoint.create({
            restAPI,
            hashId: email,
            point
        })
        // 문제가 없다면 로그인, 쿠키 생성을 위해 클라이언트 서버의 백엔드로 리다이렉트
    }
    catch(e) {
        console.log(e.message)
        res.json(responseObject(false, '비정상적인 접근입니다.'))
    }
})


export default router;
