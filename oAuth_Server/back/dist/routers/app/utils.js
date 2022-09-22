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
exports.makeRawVP = exports.filterNotNeeded = exports.rawVP = exports.refineVP = exports.getUserinfo = exports.insertNewUri = exports.filterNull = exports.noWhiteSpace = exports.boolToNum = exports.infoStringToBool = exports.responseObject = exports.generateHash = exports.makeRedirectUriList = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dataNeeded_model_1 = __importDefault(require("../../models/webSite/dataNeeded.model"));
const redirectURI_model_1 = __importDefault(require("../../models/webSite/redirectURI.model"));
const web3_1 = __importDefault(require("../../web3"));
const makeRedirectUriList = (length) => {
    let tempRedirectUri = new Array(length);
    for (let i = 0; i < tempRedirectUri.length; i++) {
        tempRedirectUri[i] = null;
    }
    return tempRedirectUri;
};
exports.makeRedirectUriList = makeRedirectUriList;
const generateHash = (appName, email) => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const forRestAPI = appName + email + randomNum;
    const randomNum2 = Math.floor(Math.random() * 1000000) + 1000000;
    const forSecret = appName + email + randomNum2;
    const REST_API = crypto_1.default.createHmac('sha256', forRestAPI).digest('hex').substr(0, 31);
    const client_secret = crypto_1.default.createHmac('sha256', forSecret).digest('hex').substr(0, 31);
    const appCodes = [REST_API, client_secret];
    return appCodes;
};
exports.generateHash = generateHash;
const responseObject = (status, msg) => {
    return {
        status,
        msg
    };
};
exports.responseObject = responseObject;
const infoStringToBool = (getUserInfo) => {
    const getInfoBool = [];
    for (let i = 0; i < getUserInfo.length; i++) {
        if (getUserInfo[i].get == true) {
            getInfoBool.push(1);
        }
        else {
            getInfoBool.push(0);
        }
    }
    return getInfoBool;
};
exports.infoStringToBool = infoStringToBool;
const boolToNum = (infoArray) => {
    let reqVP = [];
    for (let i = 0; i < infoArray.length; i++) {
        if (infoArray[i] == true) {
            reqVP.push(1);
        }
        else {
            reqVP.push(0);
        }
    }
    return reqVP;
};
exports.boolToNum = boolToNum;
const noWhiteSpace = (uri) => {
    for (let i = 0; i < uri.length; i++) {
        if (uri[i] !== null) {
            uri[i] = uri[i].trim();
        }
    }
    return uri;
};
exports.noWhiteSpace = noWhiteSpace;
const filterNull = (uris) => {
    const newRedirectUri = [];
    for (let i = 0; i < uris.length; i++) {
        if (uris[i] !== null && uris[i] !== '') {
            newRedirectUri.push(uris[i]);
        }
    }
    return newRedirectUri;
};
exports.filterNull = filterNull;
const insertNewUri = (restAPI, uris) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < uris.length; i++) {
        const newInsert = yield redirectURI_model_1.default.create({
            restAPI: restAPI,
            redirectURI: uris[i]
        });
    }
});
exports.insertNewUri = insertNewUri;
const getUserinfo = (restAPI, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserInfo = yield dataNeeded_model_1.default.findOne({
        where: {
            restAPI: restAPI
        }
    });
    const infoArray = [getUserInfo.gender, getUserInfo.name, getUserInfo.age,
        getUserInfo.addr, getUserInfo.mobile, getUserInfo.email];
    let reqVP = [];
    for (let i = 0; i < infoArray.length; i++) {
        if (infoArray[i] == true) {
            reqVP.push(1);
        }
        else {
            reqVP.push(0);
        }
    }
    const contract = yield (0, web3_1.default)();
    const VP = yield contract.methods.getVP(hash, reqVP).call();
    let vpObjects = [
        { att: 'gender', value: VP.gender },
        { att: 'name', value: VP.name },
        { att: 'age', value: VP.age },
        { att: 'addr', value: VP.addr },
        { att: 'mobile', value: VP.mobile },
        { att: 'email', value: VP.email }
    ];
    return vpObjects;
});
exports.getUserinfo = getUserinfo;
const refineVP = (rawVP) => {
    let refinedVP = [];
    for (let i = 0; i < rawVP.length; i++) {
        if (rawVP[i].value !== '' && rawVP[i].value !== '0')
            refinedVP.push(rawVP[i]);
    }
    return refinedVP;
};
exports.refineVP = refineVP;
const rawVP = (infoReq) => {
    const rawVP = [
        { att: 'email', value: infoReq.email },
        { att: 'name', value: infoReq.name },
        { att: 'age', value: infoReq.age },
        { att: 'gender', value: infoReq.gender },
        { att: 'mobile', value: infoReq.mobile },
        { att: 'addr', value: infoReq.addr }
    ];
    return rawVP;
};
exports.rawVP = rawVP;
const filterNotNeeded = (infos) => {
    for (let i = 0; i < infos.length; i++) {
        if (infos[i].value == false) {
            delete infos[i];
        }
    }
    return infos;
};
exports.filterNotNeeded = filterNotNeeded;
const makeRawVP = (VP) => {
    let rawVP = [
        { att: 'gender', value: VP.gender },
        { att: 'name', value: VP.name },
        { att: 'age', value: VP.age },
        { att: 'addr', value: VP.addr },
        { att: 'mobile', value: VP.mobile },
        { att: 'email', value: VP.email }
    ];
    return rawVP;
};
exports.makeRawVP = makeRawVP;
