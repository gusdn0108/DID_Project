"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../config/config"));
const mode = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';
const config = config_1.default[mode];
const sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, config), { models: [__dirname + "/**/*.model.ts"] }));
exports.default = sequelize;
