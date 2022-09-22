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
const utils_1 = require("../../routers/app/utils");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redirectURI_model_1 = __importDefault(require("../../models/webSite/redirectURI.model"));
const web3_1 = __importDefault(require("../../web3"));
const totalPoint_model_1 = __importDefault(require("../../models/user/totalPoint.model"));
const utils_2 = require("../../routers/user/utils");
const app_model_1 = __importDefault(require("../../models/webSite/app.model"));
const dataNeeded_model_1 = __importDefault(require("../../models/webSite/dataNeeded.model"));
const verifyId_model_1 = __importDefault(require("../../models/user/verifyId.model"));
let response;
const authorize = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, restAPI, reURL, giveUserInfo } = data;
    const userhash = email + password;
    const hash = crypto_1.default.createHash('sha256').update(userhash).digest('base64');
    try {
        const checkRedirectUri = yield redirectURI_model_1.default.findOne({
            where: {
                restAPI: restAPI,
                redirectURI: reURL,
            },
        });
        if (!checkRedirectUri)
            throw new Error('존재하지 않는 어플리케이션 혹은 redirect Uri');
        const contract = yield (0, web3_1.default)();
        const result = yield contract.methods.getUser(hash).call();
        if ((result[0] == '' && result[2] == 0) || email !== result[5]) {
            response = (0, utils_1.responseObject)(false, 'id/pw를 확인해주세요');
            throw new Error(response.msg);
        }
        const isRegistered = yield totalPoint_model_1.default.findOne({
            where: {
                restAPI,
                email,
            },
        });
        if (!isRegistered) {
            response = {
                status: 'first',
                registerUri: `${utils_2.frontend}/userAppRegister?email=${email}&restAPI=${restAPI}&redirectUri=${reURL}&hash=${hash}&giveUserInfo=${giveUserInfo}`,
            };
            const headerINfo = { key: 'Access-Control-Allow-Origin', value: utils_2.frontend };
            return { response, headerINfo };
        }
        if (result) {
            const sentHash = encodeURIComponent(hash);
            response = {
                status: 'redirect',
                redirectInfo: `${reURL}?email=${email}&hash1=${sentHash}`,
            };
            return response;
        }
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const codeAuthorize = (MAKE_ACCESS_TOKEN) => __awaiter(void 0, void 0, void 0, function* () {
    const EXPIRES_IN = 43199;
    try {
        if (MAKE_ACCESS_TOKEN.grant_type !== 'authorization_code') {
            throw new Error('잘못된 데이터 형식입니다.');
        }
        const checkSecretKey = yield app_model_1.default.findOne({
            where: {
                restAPI: MAKE_ACCESS_TOKEN.restAPI,
                code: MAKE_ACCESS_TOKEN.client_secret,
            },
        });
        if (!checkSecretKey) {
            throw new Error('잘못된 접근입니다.');
        }
        const ACCESS_TOKEN = jsonwebtoken_1.default.sign({
            MAKE_ACCESS_TOKEN,
            exp: EXPIRES_IN,
        }, process.env.SECRET_KEY);
        response = {
            status: true,
            ACCESS_TOKEN,
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const codeAuthorize2 = (bearer_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded_token = Buffer.from(bearer_token, 'base64').toString('utf-8');
        const decode1 = decoded_token.split('}');
        const decode2 = JSON.parse(decode1[1] + '}}').MAKE_ACCESS_TOKEN;
        if (decode2.grant_type == 'authorization_code') {
            const getUserInfo = yield dataNeeded_model_1.default.findOne({
                where: {
                    restAPI: decode2.restAPI,
                },
            });
            const infoArray = [getUserInfo.gender, getUserInfo.name, getUserInfo.age, getUserInfo.addr, getUserInfo.mobile, getUserInfo.email];
            const reqVP = (0, utils_1.boolToNum)(infoArray);
            const contract = yield (0, web3_1.default)();
            const VP = yield contract.methods.getVP(decode2.hash, reqVP).call();
            const rawVP = (0, utils_1.makeRawVP)(VP);
            const refinedVP = (0, utils_1.refineVP)(rawVP);
            response = {
                status: true,
                VP: refinedVP,
                hash: decode2.hash,
            };
        }
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, 'access token 검증 실패');
    }
    return response;
});
const localAuthorize = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userhash = email + password;
    let cookieInfo;
    try {
        const hash = crypto_1.default.createHash('sha256').update(userhash).digest('base64');
        const dbUser = yield verifyId_model_1.default.findOne({
            where: {
                email
            },
        });
        if (!dbUser)
            throw new Error('id/pw를 확인해주세요');
        const contract = yield (0, web3_1.default)();
        const result = yield contract.methods.getUser(hash).call();
        if ((result[0] == '' && result[2] == 0) || email !== result[5]) {
            response = (0, utils_1.responseObject)(false, 'id/pw를 확인해주세요');
            throw new Error(response.msg);
        }
        if (result) {
            let token = jsonwebtoken_1.default.sign({
                email: email,
                hashId: hash,
            }, process.env.SECRET_KEY);
            cookieInfo = { key: 'user', value: token, options: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } };
            response = {
                status: true,
                token: token,
            };
            return { response, cookieInfo };
        }
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const loginService = {
    authorize,
    codeAuthorize,
    codeAuthorize2,
    localAuthorize,
};
exports.default = loginService;
