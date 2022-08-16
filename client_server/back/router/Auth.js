const express = require('express');
const nodeMailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Auth, sequelize } = require('../models');
const { Op } = require('sequelize');

const generateRandom = (min, max) => {
    const ranNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    const array = [];
    for (let i = 0; i < 6; i++) {
        array.push(ranNum[i]);
    }

    return array;
};

router.post('/email', async (req, res) => {
    const number = generateRandom(111111, 999999);
    console.log('짤짤짤짤짤ㅉ라ㅉ라ㅉ라짜', number);
    let email = req.body.email;
    const mailPoster = nodeMailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: 'gusdn6671@naver.com',
            pass: 'iks1312!#!@',
        },
    });
    let mailOptions = {
        from: 'gusdn6671@naver.com',
        to: email,
        subject: '인증번호 입력해주세요 ',
        html: `<div 
        style='
        text-align: center; 
        width: 60%; 
        height: 50%;
        margin: 15%;
        padding: 20px;
        border:2px solid #FFB6C1;
        border-radius: 10px;
        background-color:#FFFAFA;
        '>

        
        <h2 style='
        color:pink;
        font-weight:bold;
        '>아래 6자리 숫자를 화면에 입력해주세요.</h2> <br/>  
        <div style='display: flex;
            justify-content: space-between ;
           '>
           <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[0]}
           </h1>
           
        </div>
        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[1]}
           </h1>
           
        </div>
        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[2]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[3]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[4]}
           </h1>
           
        </div>

        <div style='  width:5rem;
           height:5rem;
           border:2px solid #FFB6C1;
           border-radius: 10px;
           background-color:#FFFAFA;'>
           <h1 style='  
           text-align:center;
           font-weight:bold;
           font-size:47px;
           color:#FFB6C1;'>
           ${number[5]}
           </h1>
           
        </div>

   </div>


</div> `,
    };

    mailPoster.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201);
        }
    });
});

router.post('/SignUp', async (req, res) => {
    try {
        const exEmail = await Auth.findOne({
            where: {
                email: req.body.email,
            },
        });
        const exUserName = await Auth.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (exEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }
        if (exUserName) {
            return res.status(403).send('이미 사용중인 닉네임입니다 ');
        }

        const hash = await bcrypt.hash(req.body.password, 12);

        await Auth.create({
            email: req.body.email,
            password: hash,
            username: req.body.username,
        });
        res.status(201).send('회원가입이 완료되었슴니당 ㅎㅎ');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });

        if (_user) {
            if (bcrypt.compareSync(req.body.password, _user.dataValues.password)) {
                delete _user.dataValues.password;
                console.log(_user.dataValues);

                let token = jwt.sign(
                    {
                        ..._user.dataValues,
                        exp: Math.floor(Date.now() / 1000) + 60000,
                        iat: Math.floor(Date.now() / 1000),
                    },
                    process.env.SECRET_KEY,
                );

                res.cookie('user', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({
                    status: true,
                    userData: _user.dataValues,
                    token: token,
                });

                console.log(token);
            } else {
                res.json({
                    status: false,
                    msg: '너 비밀번호 틀림 ',
                });
            }
        } else {
            res.json({
                status: false,
                msg: '너 이메일이 틀림 ',
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

module.exports = router;
