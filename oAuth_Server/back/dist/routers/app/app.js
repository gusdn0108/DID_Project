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
const app_service_1 = __importDefault(require("../../services/app/app.service"));
const router = express_1.default.Router();
const MAX_REDIRECT_URI_NUM = 5;
let response;
router.post('/apiDistribution', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appName, email } = req.body;
    try {
        response = yield app_service_1.default.apiDistribution(appName, email);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.post('/getMyApp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        response = yield app_service_1.default.getMyApp(email);
        console.log(response);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.post('/deleteApp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restAPI, client_secret } = req.body;
    try {
        response = yield app_service_1.default.deleteApp(restAPI, client_secret);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.use('/appInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restAPI } = req.body;
    try {
        response = yield app_service_1.default.appInfo(restAPI);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.use('/getInfoUpdate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { getUserInfo, restAPI } = req.body;
    try {
        response = yield app_service_1.default.getInfoUpdate(getUserInfo, restAPI);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.post('/updateRedirect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uris, restAPI } = req.body;
    try {
        response = yield app_service_1.default.updateRedirect(uris, restAPI);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.get('/giveUserInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restAPI } = req.query;
    try {
        response = yield app_service_1.default.giveUserInfo(restAPI);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
router.post('/userdidregister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response = yield app_service_1.default.userdidregister(req.body);
        if (response.status !== true)
            throw new Error(response.msg);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
    }
    res.json(response);
}));
exports.default = router;
