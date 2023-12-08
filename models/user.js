const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Users = sequelize.define('users', {
    /*id: {
        type: Sequelize.STRING,
        primaryKey: true
    },*/
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    numberOfWins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
    }
});

module.exports = Users;