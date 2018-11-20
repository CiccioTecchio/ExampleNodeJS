const Sequelize = require('sequelize');
const singleton = require('../signleton/singleton.js');

const User = singleton.define('users', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        
    },
});

module.exports = User;