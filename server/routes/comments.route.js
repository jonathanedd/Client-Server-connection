// GET / all commets
// POST /:postId create comment
// GET /:id get comment by id
//  PATCH /:id update comment
// DELETE /:id Delete comment ( status = 'deleted)
const express = require("express");

// middlewares
const { protectToken } = require("../middlewares/users.middleware");
const { commentExist } = require("../middlewares/comments.middleware");
const {
  createCommentValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

// controllers
const {
  getAllCommets,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/comments.controller");

const router = express.Router();

router.use(protectToken);

router.get("/", getAllCommets);

router.post(
  "/:postId",
  createCommentValidation,
  checkValidations,
  createComment
);

router
  .use("/:id", commentExist)
  .route("/:id")
  .get(getCommentById)
  .patch(updateComment)
  .delete(deleteComment);

module.exports = { commentsRouter: router };
