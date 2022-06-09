//DataTypes useful for every type of data with different databases sunch SQL
const { DataTypes } = require("sequelize");

// Connect to database through utils code
const { db } = require("../utils/database");

// users columns variable in Uppercase User
const PostImg = db.define("postImg", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  postImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { PostImg };
