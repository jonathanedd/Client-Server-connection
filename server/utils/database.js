//MODULE GOOD PRACTICE JUST ONE CONNECTION TO DATABASE

// 12. connect Sequelize
const { Sequelize } = require('sequelize');

// import dotenv
const dotenv = require('dotenv');

dotenv.config({path : './config.env'});



// Connect to the database
const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false
});

module.exports = { db }