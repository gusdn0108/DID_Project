const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { filterNull } = require('./utils');
const { Account, UserInfo } = require('../models');
require('dotenv').config();

const router = express.Router();

const baseUrl = 'http://localhost:8000';

const Otp = {
    clientId: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
    client_secret: process.env.CLIENT_SECRET,
    giveUserInfo: process.env.GIVE_USER_INFO,
};

router.get('/DIDLogin', async (req, res) => {
    const url = `http://localhost:8080/login?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code&giveUserInfo=${Otp.giveUserInfo}`;
    res.redirect(url);
});

router.get('/getCode', async (req, res) => {
    const { email, hash1 } = req.query;
    const url = 'http://localhost:8000/oauth/login/codeAuthorize';

    //const hash = hash1.replace(/ /g, '+');
    const hash = decodeURIComponent(hash1);

    const Data = {
        grant_type: 'authorization_code',
        restAPI: Otp.clientId,
        client_secret: Otp.client_secret,
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
                Authorization: access_token,
            },
        };

        const response = await axios.get(url, Header);
        const { VP, hash } = response.data;
        console.log(VP);

        const vpCookie = filterNull(VP);

        let stringCookie = '';
        for (let i = 0; i < vpCookie.length; i++) {
            stringCookie += vpCookie[i].att + '=';
            stringCookie += vpCookie[i].value + '&';
        }

        const ACCESS_TOKEN = jwt.sign(
            {
                hash,
                stringCookie,
            },
            process.env.SECRET_KEY,
        );

        const cookiOpt = { maxAge: 43199 };
        res.cookie('accessToken', ACCESS_TOKEN, cookiOpt);
        res.header('Access_control_allow_origin', 'http://localhost:3001');
        res.header('Content-Type', 'application/json');
        const result = {
            redirectUri: `http://localhost:3001/login?accessToken=${ACCESS_TOKEN.split('.')[1]}`,
        };
        res.json(result);
    } catch (e) {
        console.log(e.message);
    }
});

router.post('/giveUserinfo', async (req, res) => {
    try {
        const { vp, email } = req.body;
        const isRegistered = await Account.findOne({
            where: {
                email,
            },
        });

        if (isRegistered) throw new Error('이미 등록된 사용자입니다.');

        const saveUserInfo = await Account.create({
            email,
        });

        let name = '';
        let mobile = '';

        for (let i = 0; i < vp.length; i++) {
            if (vp[i].att == 'name') {
                name = vp[i].value;
            }
            if (vp[i].att == 'mobile') {
                mobile = vp[i].value;
            }
        }
        // 수정 요망

        const insertVP = await UserInfo.create({
            email,
            name,
            mobile,
        });

        const response = {
            status: true,
            msg: '사용자 정보 수신 완료',
        };

        res.json(response);
    } catch (e) {
        console.log(e.message);
        const response = {
            status: false,
            msg: e.message,
        };
        res.json(response);
    }
});

router.get('/getoauthPoint', async (req, res) => {
    const { email } = req.query;
    try {
        const response = await axios.get(`${baseUrl}/oauth/app/getPoint?email=${email}&restAPI=${Otp.clientId}`);
        if (response.data.status == false) throw new Error(response.data.msg);

        res.json({
            status: true,
            point: response.data.point,
        });
    } catch (e) {
        console.log(e.message);
        const response = {
            status: false,
            msg: e.message,
        };
        res.json(response);
    }
});

module.exports = router;
