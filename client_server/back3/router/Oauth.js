const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

const baseUrl = 'http://localhost:8000/api/Oauth';
//  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const Otp = {
    clientId: '111272420c8a8602fe331f4bfa7fd24', // back의 예명
    redirectUri: 'http://localhost:4004',
};

router.get('/RedirectUrl', (req, res) => {
    const url = `http://localhost:8080?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
    res.redirect(url);
});

router.post('/getCode', async (req, res) => {
    // const { userInfo } = req.body;
    // console.log(userInfo);

    // const userRestAPI = [];
    // const userSecretKey = [];

    // for (let i = 0; i < userInfo.length; i++) {
    //     userRestAPI.push(userInfo[i].restAPI);
    //     userSecretKey.push(userInfo[i].clientSecretKey);
    // }

    // const userOTP = {
    //     clientId: userRestAPI,
    //     clientSecretKey: userSecretKey,
    // };

    // const RestAPI = userOTP.clientId;

    // const Data = {
    //     clientId: RestAPI,
    //     grant_type: 'authorization_code',
    //     code: userOTP.clientSecretKey,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // try {
    //     await axios.post(`${baseUrl}/getToken`, Data);
    // } catch (error) {
    //     console.log(error);
    // }
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

module.exports = router;
