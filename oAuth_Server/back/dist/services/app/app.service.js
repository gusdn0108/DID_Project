"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const totalPoint_model_1 = __importDefault(require("../../models/user/totalPoint.model"));
const app_model_1 = __importDefault(require("../../models/webSite/app.model"));
const dataNeeded_model_1 = __importDefault(require("../../models/webSite/dataNeeded.model"));
const redirectURI_model_1 = __importDefault(require("../../models/webSite/redirectURI.model"));
const utils_1 = require("../../routers/app/utils");
let response;
const MAX_REDIRECT_URI_NUM = 5;
const apiDistribution = (appName, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [restAPI, client_secret] = (0, utils_1.generateHash)(appName, email);
        const exAppName = yield app_model_1.default.findOne({
            where: {
                appName: appName,
                owner: email,
            },
        });
        if (exAppName) {
            throw new Error('이미 등록된 이메일입니다.');
        }
        yield app_model_1.default.create({
            owner: email,
            appName,
            restAPI,
            code: client_secret,
        });
        yield dataNeeded_model_1.default.create({
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
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const getMyApp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myAppName = yield app_model_1.default.findAll({
            where: {
                owner: email,
            },
        });
        response = {
            status: true,
            myapp: myAppName,
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const deleteApp = (restAPI, client_secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetApp = yield app_model_1.default.findOne({
            where: {
                restAPI,
                code: client_secret,
            },
        });
        if (!targetApp) {
            throw new Error('잘못된 삭제 요청입니다.');
        }
        Promise.all([
            dataNeeded_model_1.default.destroy({
                where: {
                    restAPI,
                },
            }),
            totalPoint_model_1.default.destroy({
                where: {
                    restAPI,
                },
            }),
            redirectURI_model_1.default.destroy({
                where: {
                    restAPI,
                },
            }),
        ]).then(() => {
            console.log('어플리케이션 정보 삭제 완료');
        }).catch((e) => response = (0, utils_1.responseObject)(false, e.message));
        yield app_model_1.default.destroy({
            where: {
                restAPI
            }
        });
        response = (0, utils_1.responseObject)(true, '어플리케이션이 삭제되었습니다');
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const appInfo = (restAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlInfo = yield redirectURI_model_1.default.findAll({
            where: {
                restAPI,
            },
        });
        const appInfo = yield app_model_1.default.findOne({
            where: {
                restAPI,
            },
        });
        const neededInfo = yield dataNeeded_model_1.default.findOne({
            where: {
                restAPI,
            },
        });
        const tempUri = (0, utils_1.makeRedirectUriList)(MAX_REDIRECT_URI_NUM);
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
                { att: 'name', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.name },
                { att: 'email', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.email },
                { att: 'gender', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.gender },
                { att: 'age', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.age },
                { att: 'address', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.addr },
                { att: 'mobile', get: neededInfo === null || neededInfo === void 0 ? void 0 : neededInfo.mobile },
            ],
        };
        response = {
            status: true,
            result
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const getInfoUpdate = (getUserInfo, restAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const newGetInfo = (0, utils_1.infoStringToBool)(getUserInfo);
    try {
        yield dataNeeded_model_1.default.update({
            name: newGetInfo[0],
            email: newGetInfo[1],
            gender: newGetInfo[2],
            age: newGetInfo[3],
            addr: newGetInfo[4],
            mobile: newGetInfo[5],
        }, {
            where: {
                restAPI,
            },
        });
        response = (0, utils_1.responseObject)(true, '정상적으로 반영되었습니다');
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '서버 에러, 나중에 다시 시도해주세요.');
    }
    return response;
});
const updateRedirect = (uris, restAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = (0, utils_1.noWhiteSpace)(uris);
    try {
        const getre = yield redirectURI_model_1.default.findAll({
            where: {
                restAPI,
            },
        });
        const oldRedirectURI = yield redirectURI_model_1.default.destroy({
            where: {
                restAPI,
            },
        });
        const newRedirectUri = (0, utils_1.filterNull)(uri);
        (0, utils_1.insertNewUri)(restAPI, newRedirectUri);
        const deleteNull = yield redirectURI_model_1.default.destroy({
            where: {
                redirectURI: ' ',
            },
        });
        response = (0, utils_1.responseObject)(true, '리다이렉트 url 수정이 완료되었습니다.');
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '서버 에러');
    }
    return response;
});
const giveUserInfo = (restAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appName = yield app_model_1.default.findOne({
            where: {
                restAPI,
            },
        });
        const infoReq = yield dataNeeded_model_1.default.findOne({
            where: {
                restAPI,
            },
        });
        if (!infoReq) {
            throw new Error('비정상적인 접근입니다.');
        }
        let infos = (0, utils_1.rawVP)(infoReq);
        const filteredInfos = (0, utils_1.filterNotNeeded)(infos);
        response = {
            status: true,
            appName: appName.appName,
            infos: filteredInfos,
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, '비정상적인 접근입니다.');
    }
    return response;
});
const userdidregister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { restAPI, email, point, hash, giveUserInfo } = data;
    try {
        const ifUser = yield totalPoint_model_1.default.findOne({
            where: {
                email,
                restAPI,
            },
        });
        if (ifUser)
            throw new Error('이미 가입된 사용자입니다.');
        const syncUser = yield totalPoint_model_1.default.create({
            restAPI,
            email,
            point,
        });
        const rawVp = yield (0, utils_1.getUserinfo)(restAPI, hash.replace(/ /g, '+'));
        const refinedVP = (0, utils_1.refineVP)(rawVp);
        const data = {
            vp: refinedVP,
            email,
        };
        const request = yield axios_1.default.post(giveUserInfo, data);
        if (request.data.status == false) {
            throw new Error('클라이언트 서버 에러');
        }
        response = (0, utils_1.responseObject)(true, '정상적으로 등록되었습니다. 다시 로그인해주세요.');
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const appService = {
    apiDistribution,
    getMyApp,
    deleteApp,
    appInfo,
    getInfoUpdate,
    updateRedirect,
    giveUserInfo,
    userdidregister,
};
exports.default = appService;
