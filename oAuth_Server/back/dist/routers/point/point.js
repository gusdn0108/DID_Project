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
const point_service_1 = __importDefault(require("../../services/point/point.service"));
const router = express_1.default.Router();
router.post('/checkPoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let response;
    try {
        response = yield point_service_1.default.checkPoint(email);
        if (response.isError === true)
            throw new Error(response.error);
    }
    catch (e) {
    }
    res.json(response);
}));
router.post('/sendToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pointInfo } = req.body;
    let response;
    try {
        response = yield point_service_1.default.sendToken(pointInfo);
        if (response.isError === true)
            throw new Error(response.error);
    }
    catch (e) { }
    console.log(response);
    res.json(response);
}));
router.post('/usePoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, payPoint } = req.body;
    console.log(token, payPoint);
    let response;
    try {
        response = yield point_service_1.default.usePoint(token, payPoint);
    }
    catch (e) { }
    console.log(response);
    res.json(response);
}));
router.get('/getPoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const { restAPI, email } = req.query;
    try {
        response = yield point_service_1.default.getPoint(restAPI, email);
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
