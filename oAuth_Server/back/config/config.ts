import { SequelizeOptions } from 'sequelize-typescript';

interface Ioptions {
    development: SequelizeOptions;
    production: SequelizeOptions;
}

const options: Ioptions = {
    development: {
        username: 'root',
        password: '11',
        database: 'oAuthDB',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: '11',
        database: 'oAuthDB',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};

export default options;
