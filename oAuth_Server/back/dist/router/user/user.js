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
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const web3_1 = __importDefault(require("../../web3"));
const verifyId_model_1 = __importDefault(require("../../models/user/verifyId.model"));
const router = express_1.default.Router();
router.post('/oAuthRegister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, gender, name, age, addr, mobile } = req.body;
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
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });
        const result = yield contract.methods.isRegistered(hash).call();
        const restAPI = '1';
        if (result) {
            yield verifyId_model_1.default.create({
                hashId: hash,
                email,
                restAPI,
            });
            res.json({
                status: true,
                msg: '회원 가입이 완료되었습니다.',
            });
        }
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        res.json({
            status: false,
            msg: '회원 가입에 실패했습니다.',
        });
    }
}));
router.post('/upDatePassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId, email, newPassword } = req.body;
    try {
        const newpasswordId = email + newPassword;
        const newHash = crypto_1.default.createHash('sha256').update(newpasswordId).digest('base64');
        const contract = yield (0, web3_1.default)();
        yield contract.methods.updatePassword(hashId, newHash).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });
        yield verifyId_model_1.default.update({
            hashId: newHash,
        }, {
            where: {
                hashId: hashId,
            },
        });
        res.json({
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        });
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        res.json({
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        });
    }
}));
router.post('/upDateUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, name, age, addr, mobile, email, hashId } = req.body;
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
                from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
                gas: 10000000,
            });
            const result = yield contract.methods.getUser(hashId).call();
            console.log(result);
            res.json({
                status: true,
                name: result[1],
                age: result[2],
                gender: result[0],
                addr: result[3],
                mobile: result[4],
                msg: '회원정보가 변경되었습니다.',
            });
        }
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        res.json({
            status: false,
            msg: '회원정보를 변경하지 못하였습니다.',
        });
    }
}));
router.post('/searchUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId } = req.body;
    try {
        const contract = yield (0, web3_1.default)();
        const result = yield contract.methods.getUser(hashId).call();
        res.json({
            status: true,
            name: result[1],
            age: result[2],
            gender: result[0],
            addr: result[3],
            mobile: result[4],
        });
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        res.json({
            status: false,
            msg: '유저 정보를 불러오는데 실패하였습니다.',
        });
    }
}));
router.post('/deleteUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId } = req.body;
    try {
        yield verifyId_model_1.default.destroy({ where: { hashId: hashId } });
        const contract = yield (0, web3_1.default)();
        yield contract.methods.deleteUser(hashId).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
            gas: 10000000,
        });
        const checkUser = yield contract.methods.isRegistered(hashId).call();
        if (checkUser)
            throw new Error('회원 탈퇴 처리 실패');
        res.json({
            status: true,
            msg: '회원탈퇴가 완료되었습니다.',
        });
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        res.json({
            status: false,
            msg: '회원탈퇴를 실패하였습니다.',
        });
    }
}));
exports.default = router;
