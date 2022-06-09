const express = require("express");

//middlewares
const { existPost } = require("../middlewares/posts.middleware");
const { protectToken } = require("../middlewares/users.middleware");

//Controllers
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
  getUserPosts,
} = require("../controllers/posts.controller");

// utils
const { upload } = require("../utils/multer");
//router
const router = express.Router();

router.use(protectToken);

//Endpoints
router.get("/", getAllPosts);
router.post("/", upload.array("postImgs", 3), createPost);

router.get("/me", getMyPosts);

router.get("/profile/:id", getUserPosts);

router.get("/:id", existPost, getPostById);
router.patch("/:id", existPost, updatePost);
router.delete("/:id", existPost, deletePost);

//Export
module.exports = { postsRouter: router };
