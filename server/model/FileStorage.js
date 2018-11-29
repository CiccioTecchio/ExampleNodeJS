const sequelize = require('sequelize');
const singleton = require('../signleton/singleton.js');

let FileStorage = singleton.define('FileStorage', {
    id: {
        type: sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    }
});

module.exports = FileStorage;