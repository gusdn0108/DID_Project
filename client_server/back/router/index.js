const express = require('express');
const auth = require('./Auth');
const route = express.Router();

route.use('/auth', auth);

module.exports = route;
