const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');
const Web3 = require('web3');
const nodeMailer = require('nodemailer');
const router = express.Router();
const DID = require('../contracts/DID.json');
const { v4 } = require('uuid');
const web3 = new Web3(new Web3.providers.HttpProvider('https://opt-goerli.g.alchemy.com/v2/GgIVsMFIKf4Pjwp8TmTN8gXftrnZf9A2'));

router.post('/email', async (req, res) => {
    const { email, nickName } = req.body;

    try {
        const exEmail = await Auth.findOne({
            where: {
                email: email,
            },
        });

        if (exEmail) {
            return res.status(403).send('이미 사용중인 메일입니다 ');
        }
    } catch (e) {
        console.log(e);
    }
    // 중복 체크하고
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
            res.json({
                status: true,
                number: number,
            });
        }
    });
});

router.post('/oAuthRegister', async (req, res) => {
    const { email, password, gender, name, age, addr, mobile } = req.body;
    // 이메일,패스워드,성별,이름,나이,주소,핸드폰번호
    try {
        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');

        const DATA = {
            email: email,
            password: password,
            gender: gender,
            name: name,
            age: age,
            addr: addr,
            mobile: mobile,
        };

        const networkId = await web3.eth.net.getId();
        const CA = DID.networks[networkId].address;
        const abi = DID.abi;

        const deployed = await new web3.eth.Contract(abi, CA);
        await deployed.methods.registerUser(hash, DATA).send({
            from: '0xBFe83B47aE843274d6DB08F8B3c89d59Cc26aFEE',
            gas: 1000000,
        });
        const result = await deployed.methods.getUser(hash).call();
        console.log(result);

        const response = {
            status: 'fail',
            msg: '회원가입이 완료되지않았습니다',
        };
        res.json({
            response: response,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/upDateRegister', async (req, res) => {
    const { email, password, clientId, oldPassword } = req.body;

    if (clientId == 'aaaa') {
        try {
            const userHash = email + oldPassword;

            const hash = crypto.createHash('sha256').update(userHash).digest('base64');

            const DATA = {
                email: email,
                password: password,
            };

            const networkId = await web3.eth.net.getId();
            const CA = DID.networks[networkId].address;
            const abi = DID.abi;

            const deployed = await new web3.eth.Contract(abi, CA);
            await deployed.methods.updateUser(hash, DATA).send({
                from: '0xBFe83B47aE843274d6DB08F8B3c89d59Cc26aFEE',
                gas: 1000000,
            });

            const result = await deployed.methods.getUser(hash).call();
            console.log(result);
        } catch (e) {
            console.log(e.message);
        }
    } else {
        const response = {
            status: 'fail',
            msg: '등록되지 않은 클라이언트 서버입니다. ',
        };
        res.json({
            response: response,
        });
    }
});

router.post('/authorize', async (req, res) => {
    const { userId, userPw } = req.body;
    try {
        //블록체인 네트워크에 아이디 패스워드 가져와서 확인

        if (user.userId === userId && user.userPw === userPw) {
            const response = {
                status: true,
                code: 'asdfasfd',
            };
            await axios.post('http://localhost:3500/getCode', response);
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/getToken', async (req, res) => {
    console.log('1111');

    const MAKE_ACCESS_TOKEN = req.body;
    const EXPIRES_IN = 43199;
    const REFRESH_TOKEN_EXPIRES_IN = 25184000;

    const TOKEN = jwt.sign(
        {
            MAKE_ACCESS_TOKEN,
            exp: EXPIRES_IN,
        },
        process.env.SECRET_KEY,
    );

    const TOKEN2 = jwt.sign(
        {
            MAKE_ACCESS_TOKEN,
            exp: REFRESH_TOKEN_EXPIRES_IN,
        },
        process.env.SECRET_KEY,
    );

    /**
     * 
     * "token_type":"bearer",
      "access_token":"${ACCESS_TOKEN}",
      "expires_in":43199,
      "refresh_token":"${REFRESH_TOKEN}",
      "refresh_token_expires_in":25184000,
      "scope":"account_email profile"
     * 1. 유저의 토큰 ? 
     * 2. 토큰 유지시간?
     * 3. 재발급받은 토큰 ? 
     * 4. 재발급 받은 토큰의 유지시간?
     * 5. 고정값 ?
     * 
     * 찾아본 정보 :
     * access_token은 발급 받은 후 12시간-24시간(정책에 따라 변동 가능)동안 유효합니다.
     * refresh token은 두달간 유효하며, refresh token 만료가 1달 이내로 남은 시점에서 
     * 사용자 토큰 갱신 요청을 하면 갱신된 access token과 갱신된 refresh token이 함께 반환됩니다.
    */
    const TOKEN_TYPE = 'bearer';
    const REFRESH_TOKEN = TOKEN2.split('.')[1];
    const ACCESS_TOKEN = TOKEN.split('.')[1];

    const DATA = {
        TOKEN_TYPE: TOKEN_TYPE,
        ACCESS_TOKEN: ACCESS_TOKEN,
        EXPIRES_IN: EXPIRES_IN,
        REFRESH_TOKEN: REFRESH_TOKEN,
        REFRESH_TOKEN_EXPIRES_IN: REFRESH_TOKEN_EXPIRES_IN,
        scope: 'account_email profile',
    };

    try {
        await axios.post('http://localhost:3500/oAuthGetToken', DATA);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
