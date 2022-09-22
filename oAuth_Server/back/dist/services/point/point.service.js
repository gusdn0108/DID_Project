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
const models_1 = __importDefault(require("../../models"));
const totalPoint_model_1 = __importDefault(require("../../models/user/totalPoint.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const utils_1 = require("../../routers/app/utils");
const checkPoint = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const result = yield models_1.default.query(`
    SELECT p.id, p.email, p.restAPI, a.appName, p.point 
        FROM point_totals as p
        LEFT OUTER JOIN apps as a
            ON p.restAPI = a.restAPI 
        WHERE email = :email`, {
            replacements: { email },
            raw: true,
            model: totalPoint_model_1.default,
        });
        if (result[0] == undefined)
            throw new Error('유저정보가 없습니다');
        response = {
            isError: false,
            value: result,
        };
    }
    catch (e) {
        response = {
            isError: true,
            error: e.message,
        };
    }
    return response;
});
const sendToken = (pointInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    let response;
    try {
        if (pointInfo) {
            token = jsonwebtoken_1.default.sign({
                pointInfo,
            }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: 60 * 10 });
        }
        response = {
            isError: false,
            value: token,
        };
    }
    catch (e) {
        response = {
            isError: true,
            error: e.message,
        };
    }
    return response;
});
const usePoint = (token, payPoint) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    const verifyToken = (token) => {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });
        const stringified = JSON.stringify(decoded);
        const parsed = JSON.parse(stringified).pointInfo;
        const compatible = JSON.stringify(parsed);
        return { parsed, compatible };
    };
    if (!token) {
        response = {
            isError: true,
            error: '토큰이 없습니다',
        };
        throw new Error(response.error);
    }
    const { parsed, compatible } = verifyToken(token);
    const result = compatible == JSON.stringify(payPoint);
    if (!result) {
        response = {
            isError: true,
            error: '유효하지 않은 토큰입니다.',
        };
        throw new Error(response.error);
    }
    const usePoint = Object.entries(payPoint);
    const tx = yield models_1.default.transaction();
    try {
        for (let i = 0; i < usePoint.length; i++) {
            const [result] = yield totalPoint_model_1.default.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        {
                            id: usePoint[i][0],
                        },
                        {
                            point: {
                                [sequelize_1.Op.gte]: usePoint[i][1],
                            },
                        },
                    ],
                },
            });
            if (result === undefined)
                throw new Error();
            const decrement = yield totalPoint_model_1.default.decrement({
                point: Number(usePoint[i][1]),
            }, {
                where: {
                    id: usePoint[i][0],
                },
                transaction: tx,
            });
        }
        yield tx.commit();
        response = {
            isError: false,
            value: '입력한 포인트 사용 및 차감 완료',
        };
    }
    catch (e) {
        yield tx.rollback();
        response = {
            isError: true,
            error: `입력한 포인트 사용 불가 및 롤백`,
        };
    }
    return response;
});
const getPoint = (restAPI, email) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const userPoint = yield totalPoint_model_1.default.findOne({
            where: {
                restAPI,
                email,
            },
        });
        response = {
            status: true,
            point: userPoint.point,
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, '포인트를 가져오지 못했습니디.');
    }
    return response;
});
const pointService = {
    checkPoint,
    sendToken,
    usePoint,
    getPoint
};
exports.default = pointService;
