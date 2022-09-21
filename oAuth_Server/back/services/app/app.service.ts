import axios from "axios";
import { Failable, IResponse_App } from "../../@types/response";
import TotalPoint from "../../models/user/totalPoint.model";
import App from "../../models/webSite/app.model";
import DataNeeded from "../../models/webSite/dataNeeded.model";
import RedirectURI from "../../models/webSite/redirectURI.model";
import { filterNotNeeded, filterNull, generateHash, getUserinfo, infoStringToBool, insertNewUri, makeRedirectUriList, noWhiteSpace, rawVP, refineVP, responseObject } from "../../routers/app/utils";

let response: IResponse_App;
const MAX_REDIRECT_URI_NUM = 5;


const apiDistribution = async (appName: string, email: string) => {
    try {
        const [restAPI, client_secret] = generateHash(appName, email);
        const exAppName = await App.findOne({
            where: {
                appName: appName,
                owner: email,
            },
        });

        if (exAppName) {
            throw new Error('이미 등록된 이메일입니다.');
        }

        await App.create({
            owner: email,
            appName,
            restAPI,
            code: client_secret,
        });

        await DataNeeded.create({
            restAPI,
            owner: email,
            email: true,
            name: true,
            gender: false,
            age: false,
            addr: false,
            mobile: false,
        });

        response = {
            status: true,
            msg: '성공적으로 등록되었습니다.',
            REST_API: restAPI,
        };
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
};

const getMyApp = async (email:string) => {
    try {
        const myAppName = await App.findAll({
            where: {
                owner: email,
            },
        });
        // if(myAppName[0]===undefined) throw new Error('설정된 앱이 없습니다.')
        response = {
            status: true,
            myapp: myAppName,
        }
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
};


const deleteApp = async (restAPI: string, client_secret: string) => {
    try {
        const targetApp = await App.findOne({
            where: {
                restAPI,
                code: client_secret,
            },
        });
        if (!targetApp) {
            throw new Error('잘못된 삭제 요청입니다.');
        }

        Promise.all([
            DataNeeded.destroy({
                where: {
                    restAPI,
                },
            }),
            TotalPoint.destroy({
                where: {
                    restAPI,
                },
            }),
            RedirectURI.destroy({
                where: {
                    restAPI,
                },
            }),
        ]).then(() => {
            console.log('어플리케이션 정보 삭제 완료');
        }).catch((e: any) => response = responseObject(false, e.message));

        await App.destroy({
            where : {
                restAPI
            }
        })
        response = responseObject(true, '어플리케이션이 삭제되었습니다');
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
};

const appInfo = async (restAPI: string) => {
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

        const tempUri = makeRedirectUriList(MAX_REDIRECT_URI_NUM);

        for (let i = 0; i < urlInfo.length; i++) {
            tempUri[i] = urlInfo[i].redirectURI;
        }
        const result = {
            email: appInfo.owner,
            appName: appInfo.appName,
            client_secret: appInfo.code,
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
        response = {
            status: true,
            result
        }
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
}

const getInfoUpdate = async (getUserInfo: any, restAPI: string) => {
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
        response = responseObject(true, '정상적으로 반영되었습니다');
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        response = responseObject(false, '서버 에러, 나중에 다시 시도해주세요.');
    }
    return response;
}

const updateRedirect = async (uris: string[], restAPI: string) => {
    const uri = noWhiteSpace(uris);

    try {
        const getre = await RedirectURI.findAll({
            where: {
                restAPI,
            },
        });
        const oldRedirectURI = await RedirectURI.destroy({
            where: {
                restAPI,
            },
        });
        const newRedirectUri = filterNull(uri);

        insertNewUri(restAPI, newRedirectUri);

        const deleteNull = await RedirectURI.destroy({
            where: {
                redirectURI: ' ',
            },
        });

        response = responseObject(true, '리다이렉트 url 수정이 완료되었습니다.');
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        response = responseObject(false, '서버 에러');
    }
    return response;
};

const giveUserInfo = async (restAPI: any) => {
    try {
        const appName = await App.findOne({
            where: {
                restAPI,
            },
        });

        const infoReq = await DataNeeded.findOne({
            where: {
                restAPI,
            },
        });

        if (!infoReq) {
            throw new Error('비정상적인 접근입니다.');
        }

        let infos = rawVP(infoReq);

        const filteredInfos = filterNotNeeded(infos);

        response = {
            status: true,
            appName: appName.appName,
            infos: filteredInfos,
        };
    } catch (e) {
        response = responseObject(false, '비정상적인 접근입니다.');
    }
    return response;
}

const userdidregister = async(data:any) => {
    const { restAPI, email, point, hash, giveUserInfo } = data;

    try {
        const ifUser = await TotalPoint.findOne({
            where: {
                email,
                restAPI,
            },
        });

        if (ifUser) throw new Error('이미 가입된 사용자입니다.');

        const syncUser = await TotalPoint.create({
            restAPI,
            email,
            point,
        });

        const rawVp = await getUserinfo(restAPI, hash.replace(/ /g, '+'));
        const refinedVP = refineVP(rawVp);
        const data = {
            vp: refinedVP,
            email,
        };

        const request = await axios.post(giveUserInfo, data);

        if (request.data.status == false) {
            throw new Error('클라이언트 서버 에러');
        }

        response = responseObject(true, '정상적으로 등록되었습니다. 다시 로그인해주세요.');
        // 문제가 없다면 로그인, 쿠키 생성을 위해 클라이언트 서버의 백엔드로 리다이렉트
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
}

// const getPoint = async (restAPI: any, email: any) => {
//     try {
//         const userPoint = await TotalPoint.findOne({
//             where: {
//                 restAPI,
//                 email,
//             },
//         });

//         response = {
//             status: true,
//             point: userPoint.point,
//         };
//     } catch (e) {
//         response = responseObject(false, '포인트를 가져오지 못했습니디.');
//     }
//     return response;
// };

const appService = {
    apiDistribution,
    getMyApp,
    deleteApp,
    appInfo,
    getInfoUpdate,
    updateRedirect,
    giveUserInfo,
    userdidregister,
    //getPoint
}

export default appService;