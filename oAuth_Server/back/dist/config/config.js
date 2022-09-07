"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    development: {
        username: "root",
        password: "11",
        database: "oAuthDB",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "root",
        password: "11",
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
};
exports.default = options;
