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
        origin: [`${frontend}`],
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
