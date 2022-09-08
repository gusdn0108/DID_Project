const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

const baseUrl = 'http://localhost:8000';

const Otp = {
    clientId: '460716d6dfc9d3e95765694659384c',
    redirectUri: 'http://localhost:4001/api/oauth/getCode',
};

router.get('/DIDLogin', async (req, res) => {
    const url = `http://localhost:8080/login?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
    res.redirect(url);
});

router.post('/getCode', async (req, res) => {
    console.log('qweq');
    const { code, DID_ACCESS, REFRESH_ACCESS, restAPI, hash, email, reURL } = req.body;

    try {
        const response = await axios.post(`${baseUrl}/oauth/login/codeAuthorize`, { code, restAPI, hash, email, reURL });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    // const url = `http://localhost:8080/login?code=${code}`;
    // axios 요청 보내서 토큰 받기 (with 인가코드)
    // res.cookie('asfd', '')
    // res.json({sibal: 'sibal'})

    // axios 두번 oauth 백으로 1. 코드를던져서 토큰을받기 2. 토큰을던져서 유저정보받기
});

// router.post('/getToken', async (req, res) => {});

module.exports = router;
