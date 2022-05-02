//MODULE GOOD PRACTICE JUST ONE CONNECTION TO DATABASE

// 12. connect Sequelize
const { Sequelize } = require('sequelize');


// Connect to the database
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '92171002',
    database: 'blogs',
    logging: false
});

module.exports = { db }