const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

const baseUrl = 'http://localhost:8000/api/Oauth';

const Otp = {
    clientId: '460716d6dfc9d3e95765694659384cd',
    redirectUri: 'http://localhost:4001/api/oauth/getCode',
};

router.get('/DIDLogin', async (req, res) => {
    const url = `http://localhost:8080/login?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
    res.redirect(url);
});

router.get('/getCode', async (req, res) => {
    console.log('시발');
    console.log(req.body);

    // const url = `http://localhost:8080/login?code=${code}`;
    // axios 요청 보내서 토큰 받기 (with 인가코드)
    // res.cookie('asfd', '')
    // res.json({sibal: 'sibal'})

    // axios 두번 oauth 백으로 1. 코드를던져서 토큰을받기 2. 토큰을던져서 유저정보받기
});

router.post('/oAuthGetToken', async (req, res) => {});

module.exports = router;
