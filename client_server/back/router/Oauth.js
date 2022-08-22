const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const { Auth, sequelize } = require('../models');
const { Op } = require('sequelize');

const baseUrl = 'http://localhost:8000/api/Oauth';
const getHash = crypto.createHash('sha256');
const CiD = 'DIDPROEJCT';
getHash.update(CiD);
const getClientId = getHash.digest('hex');

const Otp = {
    clientId: getClientId,
    redirectUri: 'http://localhost:3500',
};

router.get('/RedirectUrl', (req, res) => {
    const url = `http://localhost:8000/api/Oauth/authorize?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
    res.redirect(url);
});

router.post('/getCode', async (req, res) => {
    const RestAPI = Otp.clientId;
    const Data = {
        clientId: RestAPI,
        grant_type: 'authorization_code',
        code: req.body.code,
        headers: {
            'Content-Type': 'routerlication/json',
        },
    };

    try {
        await axios.post(`${baseUrl}/getToken`, Data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/oAuthGetToken', async (req, res) => {
    const response = req.body;

    console.log(response);

    // const ID_TOKEN = jwt.sign(
    //     {
    //         user,
    //     },
    //     process.env.SECRET_KEY,
    // );
    // ID_TOKEN.split('.')[1]

    // response.id_token =ID_TOKEN.split('.')[1]

    // const TokenUserId = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userId
    // const TokenUserPw = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userPw
    // console.log(TokenUserId,TokenUserPw)

    /**
     * oauth서버에서 DATA값받아옴
     * 그 DATA 값에 id_token을 추가해서 front 에 token저장해줘야함 ;
     * 프론트에서 그리고 그 토큰값을 풀어서 userId 랑 userpw 를 대조해서 맞으면 로그인을 성공시켜줘야함
     * 의문점 ? : ACCESS_TOKEN에도 USER값이들어가있는데 굳이 왜 ID_TOKEN을 만들어주는지 모르겠음 ...
     * 의문점 풀이 : access_token은 사실상 back oauth검증 / id _token은 백이랑 프론트 검증용? 이라고생각해보고있음..
     * */
});

router.post('/oAuthRegister', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const _user = await Auth.findOne({
            where: {
                email: email,
            },
        });

        const getEncodedHash = bcrypt.compareSync(password, _user.dataValues.password);
        if (getEncodedHash) {
            const response = await axios.post('http://localhost:8000/oauth/register', { id, pw })
        } else {
            res.json({
                status: false,
                msg: '너 비밀번호 틀림 ',
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/test', (req,res) => {
    console.log(req.body)
})

module.exports = router;
