const express = require('express');
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Auth } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');
const emailTemplate = require('../email/index');

const generateRandom = (min, max) => {
    const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    const array = [];
    for (let i = 0; i < 6; i++) {
        array.push(ranNum[i]);
    }

    return array;
};

router.post('/email', async (req, res) => {
    const { email } = req.body;

    try {
        const exLocalEmail = await Auth.findOne({
            where: {
                email: email,
            },
        });

        if (exLocalEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }
    } catch (e) {
        console.log(e);
    }

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

    mailPoster.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201);
            res.json({
                status: true,
                number: number,
            });
        }
    });
});

router.post('/SignUp', async (req, res) => {
    const { email, password, name, phone } = req.body;

    try {
        const exLocal = await Auth.findOne({
            where: {
                email,
            },
        });

        if (exLocal) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }

        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');

        await Auth.create({
            email: email,
            userHash: hash,
            name,
            mobile: phone,
            point: 50000,
        });

        res.status(201).json({
            status: 1,
        });
    } catch (error) {
        console.log(error);
        const response = { status: false, msg: '서버 에러, 관리자에게 문의해주세요.' };
        res.json(response);
    }
});

router.post('/login', async (req, res) => {
    const { userEmail, userPw } = req.body;
    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: userEmail,
                },
            },
        });

        if (_user) {
            const userHash = userEmail + userPw;
            const hash = crypto.createHash('sha256').update(userHash).digest('base64');

            const confirmLogin = await Auth.findOne({
                where: {
                    email: userEmail,
                    userHash: hash,
                },
            });
            if (confirmLogin) {
                delete _user.dataValues.password;
                delete _user.dataValues.point;

                let token = jwt.sign(
                    {
                        ..._user.dataValues,
                    },
                    process.env.SECRET_KEY,
                );

                res.cookie('user', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({
                    status: true,
                    token: token,
                });
            } else {
                res.json({
                    status: false,
                    msg: '비밀번호가 일치하지 않습니다.',
                });
            }
        } else {
            res.json({
                status: false,
                msg: '이메일이 일치하지 않습니다.',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            msg: '관리자한태 문의바랍니다 ',
        });
    }
});

router.post('/usePoint', async (req, res) => {
    const price = req.body.price;
    try {
        // 사용자 이메일가져오기
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });

        if (_user.dataValues.point >= price) {
            const usePoint = _user.dataValues.point - price;
            const updateClient = _user.dataValues.email;

            await Auth.update({ point: usePoint }, { where: { email: updateClient } });
            res.json({
                status: true,
                msg: '구매완료되었습니다',
            });
        } else {
            res.json({
                status: false,
                msg: '금액 모자릅니다',
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/pointInquiry', async (req, res) => {
    const { email } = req.body;
    try {
        const _user = await Auth.findOne({
            where: {
                email,
            },
        });
        const getPoint = _user.dataValues.point;

        res.json({
            status: true,
            point: getPoint,
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            msg: '구매 실패 - 서버 에러',
        });
    }
});

router.post('/updateUser', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = crypto
            .createHash('sha256')
            .update(email + password)
            .digest('base64');

        await Auth.update({ userHash: hash }, { where: { email: email } });
        res.json({
            status: true,
            msg: '성공적으로 변경되었습니다.',
        });
    } catch (e) {
        console.log(e.message);
        res.json({
            status: false,
            msg: e.message,
        });
    }
});

module.exports = router;
