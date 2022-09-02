import { Sequelize } from 'sequelize-typescript';
import options from '../config/config';


const mode = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development'
const config = options[mode]

const sequelize = new Sequelize({
    ...config,
    models: [__dirname+"/**/*.model.ts"]
});

export default sequelize;