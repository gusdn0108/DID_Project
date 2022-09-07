"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    development: {
        username: 'cjh5701',
        password: 'a1234',
        database: 'oAuthDB',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'ivy',
        password: 'GOODDAY',
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
exports.default = options;
