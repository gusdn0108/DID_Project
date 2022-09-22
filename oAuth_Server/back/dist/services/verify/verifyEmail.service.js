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
const nodemailer_1 = __importDefault(require("nodemailer"));
const utils_1 = require("../../routers/app/utils");
const emailTemplate_1 = __importDefault(require("../../routers/verify/emailTemplate"));
let response;
const email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const generateRandom = (min, max) => {
        const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        const array = [];
        for (let i = 0; i < 6; i++) {
            array.push(ranNum[i]);
        }
        return array;
    };
    const number = generateRandom(111111, 999999);
    try {
        const mailPoster = nodemailer_1.default.createTransport({
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        let mailOptions = {
            from: 'gusdn6671@naver.com',
            to: email,
            subject: '인증번호 입력해주세요 ',
            html: (0, emailTemplate_1.default)(number),
        };
        const result = mailPoster.sendMail(mailOptions, function (error, info) {
            console.log('Email sent: ' + info.response);
        });
        response = {
            status: true,
            number,
        };
    }
    catch (e) {
        response = (0, utils_1.responseObject)(false, e.message);
    }
    return response;
});
const verifyService = { email };
exports.default = verifyService;
