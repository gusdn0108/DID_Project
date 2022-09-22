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
const user_service_1 = __importDefault(require("../../services/user/user.service"));
const router = express_1.default.Router();
let response;
router.post('/oAuthRegister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, gender, name, age, addr, mobile } = req.body;
    try {
        response = yield user_service_1.default.oAuthRegister(req.body);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.post('/upDatePassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId, email, newPw } = req.body;
    console.log(req.body);
    try {
        response = yield user_service_1.default.upDatePassword(req.body);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.post('/upDateUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, name, age, addr, mobile, email, hashId } = req.body;
    try {
        response = yield user_service_1.default.upDateUser(req.body);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.post('/searchUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId } = req.body;
    console.log(hashId);
    try {
        response = yield user_service_1.default.searchUser(hashId);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.post('/deleteUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashId, email } = req.body;
    try {
        response = yield user_service_1.default.deleteUser(hashId, email);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
exports.default = router;
