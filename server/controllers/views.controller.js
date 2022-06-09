const path = require("path");

// models
const { Post } = require("../models/post.model");

// utils
const { catchAsync } = require("../utils/catchAsync");

const renderIndex = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: { status: "active" },
  });
  //   const indexPath = path.join(__dirname, "..", "public", "index.html");

  res.status(200).render("index", {
    title: "Title coming from controller",
    posts,
  });
});

module.exports = { renderIndex };

// Comments
//  This is known as relative route or relative path :   ..\public\index.html
//  C:\Users\jhoed\Documents\academlo-gen-11\fullstack-blog-app\server\public\index.html  -----> Absolute route
