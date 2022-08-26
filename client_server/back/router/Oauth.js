const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const { Auth, sequelize } = require('../models');
const { Op } = require('sequelize');

const baseUrl = 'http://localhost:8000/api/Oauth';

const Otp = {
    clientId: 'aaaa',
    redirectUri: 'http://localhost:4000',
};

const RestAPI = Otp.clientId;

router.get('/RedirectUrl', (req, res) => {
    const url = `http://localhost:8080?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
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
});

module.exports = router;
