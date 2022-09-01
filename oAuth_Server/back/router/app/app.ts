import express,{Request, Response} from 'express';
import crypto from 'crypto';

const router = express.Router();

import App from '../../models/app.model';
import DataNeeded from '../../models/dataNeeded.model';
import RedirectURI from '../../models/redirectURI.model';


router.post('/apiDistribution', async (req: Request, res: Response) => {
    const { appName, email } = req.body;

    //  프론트에서 보낸 쿠키를 쪼개서 맞는 email인지 확인 (db와 대조)
    const randomNum = Math.floor(Math.random() * 1000000);
    const forRestAPI = appName + email + randomNum;
    const randomNum2 = Math.floor(Math.random() * 1000000) + 1000000;
    const forSecret = appName + email + randomNum2;
    const REST_API = crypto.createHmac('sha256', forRestAPI).digest('hex').substr(0, 31);
    const client_secret = crypto.createHmac('sha256', forSecret).digest('hex').substr(0, 31);

    try {
        const exAppName = await App.findOne({
            where: {
                appName
            },
        });

        if (exAppName) {
            const response = {
                status: false,
                msg: '이미 사용 중인 어플리케이션 이름입니다.',
            };
            res.json(response);
            return;
        }

        await App.create({
            owner: email,
            appName,
            restAPI: REST_API,
        });

        await DataNeeded.create({
            restAPI: REST_API,
            owner: email,
            email: false,
            name: false,
            gender:false,
            age : false,
            addr: false,
            mobile: false
        })

        const response = {
            status: true,
            msg: '성공적으로 등록되었습니다.',
            REST_API: REST_API,
            client_secret: client_secret,
        };
        res.json(response);
    }catch(e){
        if(e instanceof Error) console.log(e.message);
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
        const response = {
            myapp: myAppName,
        };
        res.json(response);
    }catch(e){
        if(e instanceof Error) console.log(e.message);
    }
});

router.use('/appInfo', async (req: Request, res: Response) => {
    const { restAPI } = req.body;
    try {
        const urlInfo = await RedirectURI.findAll({
            where: {
                restAPI
            },
        });
        const appInfo = await App.findOne({
            where : {
                restAPI
            }
        })
        const neededInfo = await DataNeeded.findOne({
            where : {
                restAPI
            }
        })

        console.log(urlInfo)

        const result = {
            email: appInfo?.owner,
            appName: appInfo?.appName,
            redirectURI: urlInfo,
            restAPI,
            neededInfo : [
                { att: 'name', get: neededInfo?.name},
                { att: 'email', get: neededInfo?.email},
                { att : 'gender', get: neededInfo?.gender},
                { att : 'age', get: neededInfo?.age},
                { att : 'address', get: neededInfo?.addr},
                { att : 'mobile', get : neededInfo?.mobile}
            ]
        };

        const response = {
            status: true,
            result
        };
        res.json(response);
    }catch(e){
        if(e instanceof Error) console.log(e.message);

        res.json({
            status: false,
            msg: '비정상적 접근이 감지되었습니다.',
        });
    }
});

router.use('/getInfoUpdate', async (req: Request, res: Response) => {
    const { getUserInfo, restAPI } = req.body;
    const newGetInfo = [];

    
    for(let i = 0; i < getUserInfo.length; i++) {
        if(getUserInfo[i].get == true) {
            newGetInfo.push(1)
        }
        else {
            newGetInfo.push(0)
        }
    }

    try{
        await DataNeeded.update(
            {
                name : newGetInfo[0],
                email : newGetInfo[1],
                gender : newGetInfo[2],
                age : newGetInfo[3],
                addr : newGetInfo[4],
                mobile : newGetInfo[5]
            },
            {
                where : {
                    restAPI,
                }
            }
        )

        const response = {
            status: true,
            msg: '성공적으로 반영되었습니다.'
        }
        res.json(response)
    }catch(e){
        if(e instanceof Error) console.log(e.message);

        const response = {
            status: false,
            msg : '서버 에러'
        }
        res.json(response)
    }
})

router.use('/updateRedirect', async (req: Request, res: Response) => {
    const { uri, restAPI } = req.body;

    for (let i = 0; i < uri.length; i++) {
        if (uri[i] !== null) {
            uri[i] = uri[i].trim();
            console.log(uri[i]);
        }
    }

    try {
        const update = await RedirectURI.update(
            {
                redirectURI1: uri[0],
                redirectURI2: uri[1],
                redirectURI3: uri[2],
                redirectURI4: uri[3],
                redirectURI5: uri[4],
            },
            {
                where: {
                    restAPI
                },
            },
        );

        const response = {
            status: true,
            msg: '리다이렉트 uri 수정이 완료되었습니다.',
        };
        res.json(response);
    }catch(e){
        if(e instanceof Error) console.log(e.message);

        res.json({
            status: false,
            msg: '알수 없는 에러가 발생하였습니다. 나중에 다시 시도해주세요',
        });
    }
});

export default router;
