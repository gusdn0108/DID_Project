import express from 'express';
// import router from './router';
import dotenv from 'dotenv';
import sequelize from './models';
import cors from 'cors';
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);

// app.use('/api', router);

app.listen(8000, async() => {
    try{
    await sequelize.sync({force:false})
    console.log('db connected')
    }
    catch (e){
        if (e instanceof Error) console.log(e.message);
    }
    console.log('oauth server start 8000');
});
