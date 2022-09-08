const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { response } = require('express');
const router = express.Router();

const baseUrl = 'http://localhost:8000';

const Otp = {
    clientId: 'c2568e04b476ba8acbb96841e601253',
    redirectUri: 'http://localhost:4001/api/oauth/getCode',
};

router.get('/DIDLogin', async (req, res) => {
    const url = `http://localhost:8080/login?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
    res.redirect(url);
});

router.post('/getCode', async (req, res) => {
    const { email, hash } = req.query;
    const url = 'http:localhost:8000/oauth/login/codeAuthorize';

    const Data = {
        grant_type: 'authorization_code',
        clientId: Otp.clientId,
        client_secret: '1111',
        redirect: Otp.redirectUri,
        email,
        hash,
    };

    let access_token;

    try {
        const response = await axios.post(url, Data);
        access_token = response.data.ACCESS_TOKEN;
    } catch (error) {
        console.log(error);
    }

    // axios 두번 oauth 백으로 1. 코드를던져서 토큰을받기 2. 토큰을던져서 유저정보받기
    try {
        const url = 'http://localhost:8000/oauth/login/codeAuthorize2';
        const Header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const response = await axios.get(url, Header);
        const { userId, userPw } = response.data;
        const payload = { userId, userPw };

        const cookiOpt = { maxAge: 1000 * 60 * 60 * 24 };
        res.cookie('accessToken', accessToken, cookiOpt);
    } catch (e) {
        console.log(e.message);
    }
});

router.post('/getToken', async (req, res) => {
    console.log('getToken', req.body);
});

module.exports = router;
