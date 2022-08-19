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
    let email = req.body.email;
    const mailPoster = nodeMailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: 'gusdn6671@naver.com',
            pass: 'asdf1234!@#$',
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
            res.json({
                status: true,
                number: number,
            });
        }
    });
});

router.post('/SignUp', async (req, res) => {
    const { email, userPw, userName } = req.body;

    try {
        const exEmail = await Auth.findOne({
            where: {
                email: email,
            },
        });
        const exUserName = await Auth.findOne({
            where: {
                userName: userName,
            },
        });

        if (exEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }
        if (exUserName) {
            return res.status(403).send('이미 사용중인 닉네임입니다 ');
        }

        const hash = await bcrypt.hash(userPw, 12);
        console.log(hash);
        await Auth.create({
            email: email,
            password: hash,
            username: userName,
            point: 50000,
        });

        res.status(201).send('회원가입이 완료되었슴니당 ㅎㅎ');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
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
            if (bcrypt.compareSync(userPw, _user.dataValues.password)) {
                delete _user.dataValues.password;
                console.log(_user.dataValues);

                let token = jwt.sign(
                    {
                        ..._user.dataValues,
                    },
                    process.env.SECRET_KEY,
                );

                res.cookie('user', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({
                    status: true,
                    // userData: _user.dataValues,
                    token: token,
                });
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

router.post('/usePoint', async (req, res) => {
    const price = req.body.price;
    console.log('first');
    try {
        // 사용자 이메일가져오기
        console.log(`연결?`);
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });
        console.log(_user);

        console.log(_user.dataValues.point);

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
                msg: '금액 모자릅니다  ',
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/pointInquiry', async (req, res) => {
    // 사용자 가져와야함
    console.log('연결????');
    try {
        const _user = await Auth.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email,
                },
            },
        });
        // 데이터베이스에 있는 사용자 포인트 가져오기
        const getPoint = _user.dataValues.point;
        res.json({
            status: true,
            point: getPoint,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
