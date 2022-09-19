import express, { Request, Response } from 'express';
import nodeMailer, { SentMessageInfo } from 'nodemailer';
import emailTemplate from './emailTemplate';
import VerifyId from '../../models/user/verifyId.model';
const router = express.Router();

//?
router.post('/email', async (req: Request, res: Response) => { 
    const { email } = req.body;

    const generateRandom = (min: number, max: number) => {
        const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

        const array = [];
        for (let i = 0; i < 6; i++) {
            array.push(ranNum[i]);
        }
        return array;
    };

    const number = generateRandom(111111, 999999);

    const mailPoster = nodeMailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: 'gusdn6671@naver.com',
        to: email,
        subject: '인증번호 입력해주세요 ',
        html: emailTemplate(number),
    };

    mailPoster.sendMail(mailOptions, function (error: Error | null, info: SentMessageInfo) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201);
            res.json({
                status: true,
                number,
            });
        }
    });
});

export default router;
