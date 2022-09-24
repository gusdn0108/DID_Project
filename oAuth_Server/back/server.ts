import express from 'express';
import router from './routers';
import dotenv from 'dotenv';
import sequelize from './models';
import cors from 'cors';
import { swaggerSpec } from './openAPI/swagger';
import swaggerUi from 'swagger-ui-express';
import { frontend } from './routers/user/utils';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [ 'http://localhost:8080',`${frontend}`, 'http://localhost:3000','http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003',
    'http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003'],
        credentials: true,
    }),
);
app.use('/Oauth', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8000, async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('db connected!!');
    } catch (e) {
        if (e instanceof Error) console.log(e);
    }
    console.log('oauth server start 8000');
});

// sudo ssh -i "OAuth-Back.pem" ubuntu@13.124.225.13
