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
const login_service_1 = __importDefault(require("../../services/user/login.service"));
const router = express_1.default.Router();
let response;
router.post('/authorize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, restAPI, reURL, giveUserInfo } = req.body;
    try {
        response = yield login_service_1.default.authorize(req.body);
        if (response.response) {
            const { key, value } = response.headerINfo;
            res.header(key, value);
            res.json(response.response);
        }
        else if (response.status === false)
            throw new Error(response.msg);
        else if (response.status === 'redirect')
            res.redirect(302, response.redirectInfo);
        else
            res.json(response);
    }
    catch (e) {
        res.json(response);
    }
}));
router.post('/codeAuthorize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const MAKE_ACCESS_TOKEN = req.body;
    try {
        response = yield login_service_1.default.codeAuthorize(MAKE_ACCESS_TOKEN);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.get('/codeAuthorize2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer_token = req.headers.authorization;
    try {
        response = yield login_service_1.default.codeAuthorize2(bearer_token);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) { }
    res.json(response);
}));
router.post('/localAuthorize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        response = yield login_service_1.default.localAuthorize(email, password);
        if (response.response) {
            const { key, value, options } = response.cookieInfo;
            res.cookie(key, value, options);
            res.json(response.response);
        }
        else if (response.status !== true)
            throw new Error(response.msg);
        else
            res.json(response);
    }
    catch (e) {
        res.json(response);
    }
}));
exports.default = router;
