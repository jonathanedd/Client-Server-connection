const { Post } = require("./post.model");
const { User } = require("./user.model");
const { Comments } = require("./comment.model");
const { PostImg } = require("./postImg.model");

const initModels = () => {
  //Establish relations: one user has many post, Posts belongs to a user
  User.hasMany(Post);
  Post.belongsTo(User);

  // 1 user = Many comments
  User.hasMany(Comments);
  Comments.belongsTo(User);

  // 1 post == many comments
  Post.hasMany(Comments);
  Comments.belongsTo(Post);

  // 1 post has many Imgs
  Post.hasMany(PostImg);
  PostImg.belongsTo(Post);
};

module.exports = { initModels };
