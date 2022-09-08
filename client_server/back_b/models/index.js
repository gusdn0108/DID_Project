const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const account = require('./models/account')(sequelize, DataTypes);
const userInfo = require('./models/userInfo')(sequelize, DataTypes);

const auth = require('./Auth')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.account = account;
db.userInfo = userInfo;
db.auth = auth;

module.exports = db;
