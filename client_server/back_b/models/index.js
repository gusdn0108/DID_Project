const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Account = require('./models/account')(sequelize, DataTypes);
const UserInfo = require('./models/userInfo')(sequelize, DataTypes);

const auth = require('./Auth')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Account = Account;
db.UserInfo = UserInfo;
db.auth = auth;

module.exports = db;
