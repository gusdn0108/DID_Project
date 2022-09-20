import nodeMailer, { SentMessageInfo } from 'nodemailer';
import { responseObject } from '../../routers/app/utils';
import emailTemplate from '../../routers/verify/emailTemplate';

let response: any;

const email = async (email: string) => {
    const generateRandom = (min: number, max: number) => {
        const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        const array = [];
        for (let i = 0; i < 6; i++) {
            array.push(ranNum[i]);
        }
        return array;
    };
    const number = generateRandom(111111, 999999);
    try {

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


        const result = mailPoster.sendMail(mailOptions, function (error: Error | null, info: SentMessageInfo) {
                console.log('Email sent: ' + info.response);
            })
            response = {
                status: true,
                number,
            };
    } catch (e) {
        response = responseObject(false, e.message);
    }
    return response;
};

const verifyService = {email};
export default verifyService;
