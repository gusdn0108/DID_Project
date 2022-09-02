import {SequelizeOptions} from "sequelize-typescript";

interface Ioptions {
    development: SequelizeOptions,
    production: SequelizeOptions
}

const options: Ioptions = {
    development: {
        username: "ivy",
        password: "GOODDAY",
        database: "oAuthDB",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production:{
        username: "ivy",
        password: "GOODDAY",
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
}

export default options;