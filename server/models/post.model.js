const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Post = db.define('post', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: { // userId determines Which user created the post
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'Active'
    }  
});


module.exports = { Post };
