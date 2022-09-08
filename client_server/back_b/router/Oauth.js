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

    const { code, DID_ACCESS, REFRESH_ACCESS, restAPI, hash, email, reURL } = req.body;

    try {
        const response = await axios.post(`${baseUrl}/oauth/login/codeAuthorize`, { code, restAPI, hash, email, reURL });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }

    // axios 두번 oauth 백으로 1. 코드를던져서 토큰을받기 2. 토큰을던져서 유저정보받기
});

router.post('/getToken', async (req, res) => {
    console.log('getToken', req.body);
});

module.exports = router;
