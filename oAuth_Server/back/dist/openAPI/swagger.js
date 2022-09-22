"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const definition = {
    openapi: "3.0.0",
    info: {
        title: "Oauth Back server API",
        description: "Optional",
        version: "0.0.1",
    },
    server: [{
            url: "http://localhost:8000"
        }],
    schema: ['http'],
};
const options = {
    definition,
    apis: [path_1.default.join(__dirname, '../routers/**/*.ts')]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
