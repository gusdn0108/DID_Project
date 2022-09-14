const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Auth = require('./Auth')(sequelize, DataTypes);

const Account = require('./oauth/account')(sequelize, DataTypes);
const UserInfo = require('./oauth/userInfo')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Auth = Auth;
db.Account = Account;
db.UserInfo = UserInfo;

module.exports = db;
