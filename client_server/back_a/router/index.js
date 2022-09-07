const express = require('express');
const auth = require('./Auth');
const oauth = require('./Oauth');
const buyItme = require('./buyItem.js');
const route = express.Router();

route.use('/auth', auth);
route.use('/oauth', oauth);
route.use('/buyItem', buyItme);

module.exports = route;
