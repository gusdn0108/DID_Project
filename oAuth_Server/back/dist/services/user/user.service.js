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
const crypto_1 = __importDefault(require("crypto"));
const totalPoint_model_1 = __importDefault(require("../../models/user/totalPoint.model"));
const verifyId_model_1 = __importDefault(require("../../models/user/verifyId.model"));
const app_model_1 = __importDefault(require("../../models/webSite/app.model"));
const dataNeeded_model_1 = __importDefault(require("../../models/webSite/dataNeeded.model"));
const redirectURI_model_1 = __importDefault(require("../../models/webSite/redirectURI.model"));
const utils_1 = require("../../routers/app/utils");
const web3_1 = __importDefault(require("../../web3"));
let response;
const oAuthRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, gender, name, age, addr, mobile } = data;
    try {
        const userHash = email + password;
        const hash = crypto_1.default.createHash('sha256').update(userHash).digest('base64');
        const DATA = {
            email,
            gender,
            name,
            age,
            addr,
            mobile,
        };
        const contract = yield (0, web3_1.default)();
        yield contract.methods.registerUser(hash, DATA).send({
            from: process.env.WALLET_ADDRESS,
        });
        const result = yield contract.methods.isRegistered(hash).call();
        if (!result)
            throw new Error('회원 가입에 실패했습니다.');
        yield verifyId_model_1.default.create({
            email,
        });
        response = (0, utils_1.responseObject)(true, '회원 가입이 완료되었습니다.');
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const upDatePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId, email, newPw } = data;
    try {
        const newpasswordId = email + newPw;
        const newHash = crypto_1.default.createHash('sha256').update(newpasswordId).digest('base64');
        const contract = yield (0, web3_1.default)();
        yield contract.methods.updatePassword(hashId, newHash).send({
            from: process.env.WALLET_ADDRESS,
            gas: 10000000
        });
        response = (0, utils_1.responseObject)(true, '비밀번호 변경이 완료되었습니다.');
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '비밀번호 변경이 실패하였습니다.');
    }
    return response;
});
const upDateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, name, age, addr, mobile, email, hashId } = data;
    try {
        const DATA = {
            gender,
            name,
            age,
            addr,
            mobile,
            email,
        };
        const contract = yield (0, web3_1.default)();
        const checkUser = yield contract.methods.isRegistered(hashId).call();
        if (checkUser) {
            yield contract.methods.updateUser(hashId, DATA).send({
                from: process.env.WALLET_ADDRESS,
                gas: 10000000,
            });
            const result = yield contract.methods.getUser(hashId).call();
            response = {
                status: true,
                name: result[1],
                age: result[2],
                gender: result[0],
                addr: result[3],
                mobile: result[4],
                msg: '회원정보가 변경되었습니다.',
            };
        }
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '회원정보를 변경하지 못하였습니다.');
    }
    return response;
});
const searchUser = (hashId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield (0, web3_1.default)();
        const result = yield contract.methods.getUser(hashId).call();
        response = {
            status: true,
            name: result[1],
            age: result[2],
            gender: result[0],
            addr: result[3],
            mobile: result[4],
        };
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '유저 정보를 불러오는데 실패하였습니다.');
    }
    return response;
});
const deleteUser = (hashId, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield (0, web3_1.default)();
        yield contract.methods.deleteUser(hashId).send({
            from: process.env.WALLET_ADDRESS,
            gas: 10000000,
        });
        const checkUser = yield contract.methods.isRegistered(hashId).call();
        if (checkUser)
            throw new Error('회원 탈퇴 처리 실패');
        const deleteApp = yield app_model_1.default.findAll({
            where: { owner: email },
        });
        for (let i = 0; i < deleteApp.length; i++) {
            yield dataNeeded_model_1.default.destroy({
                where: {
                    restAPI: deleteApp[i].restAPI,
                },
            });
            yield redirectURI_model_1.default.destroy({
                where: {
                    restAPI: deleteApp[i].restAPI,
                },
            });
        }
        yield app_model_1.default.destroy({
            where: {
                owner: email,
            },
        });
        yield totalPoint_model_1.default.destroy({ where: { email: email } });
        yield verifyId_model_1.default.destroy({ where: { email: email } });
        response = (0, utils_1.responseObject)(true, '회원 탈퇴가 완료되었습니다.');
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        response = (0, utils_1.responseObject)(false, '회원 탈퇴에 실패했습니다.');
    }
    return response;
});
const userService = {
    oAuthRegister,
    upDatePassword,
    upDateUser,
    searchUser,
    deleteUser,
};
exports.default = userService;
