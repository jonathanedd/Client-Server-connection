//DataTypes useful for every type of data with different databases sunch SQL
const { DataTypes } = require('sequelize')

// Connect to database through utils code
const { db } = require('../utils/database');

// users columns variable in Uppercase User
const User = db.define('user', {
    id: {
        // id Allows to identify the data type in database (never repeats)
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    status : {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
})

module.exports = { User }