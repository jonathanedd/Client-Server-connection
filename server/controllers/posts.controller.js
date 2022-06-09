const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comments } = require("../models/comment.model");
const { PostImg } = require("../models/postImg.model");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { storage } = require("../utils/firebase");
const { async } = require("@firebase/util");

//HTTP GET
const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    // where: { status: "active" },
    include: [
      { model: PostImg },
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
      {
        model: Comments,
        // require: false,
        // where: { status: "active" },
        include: [{ model: User, attributes: ["id", "name"] }],
      },
    ],
  });

  const postsPromises = posts.map(async (post) => {
    const postImgsPromises = post.postImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const url = await getDownloadURL(imgRef);

      postImg.postImgUrl = url;
      return postImg;
    });

    const postImgsResolved = await Promise.all(postImgsPromises);
    post.postImgs = postImgsResolved;

    return post;
  });
  const postsResolved = await Promise.all(postsPromises);
  // console.log(postsPromises);

  res.status(201).json({
    posts: postsResolved,
  });
});

//HTTP POST
const createPost = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  const { sessionUser } = req;

  const newPost = await Post.create({
    title,
    content,
    userId: sessionUser.id,
  });

  const postImgPromises = req.files.map(async (file) => {
    const imgsRef = ref(
      storage,
      `posts/${newPost.id}-${Date.now()}-${file.originalname}`
    );

    const imgUploaded = await uploadBytes(imgsRef, file.buffer);

    return await PostImg.create({
      postId: newPost.id,
      postImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(postImgPromises);

  res.status(201).json({
    status: "success",
    newPost,
  });
});

//HTTP GET
const getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  res.status(201).json({
    post,
  });
});

//HTTP UPDATE
const updatePost = catchAsync(async (req, res) => {
  const { post } = req;
  const { title, content } = req.body;

  await post.update({ title, content });

  res.status(201).json({
    status: "success",
  });
});

//HTTP DELETE
const deletePost = catchAsync(async (req, res) => {
  const { post } = req;
  await post.update({
    status: "Deleted",
  });

  res.status(201).json({
    status: "success",
  });
});

const getUserPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const posts = await Post.findAll({
    where: { userId: id, status: "active" },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    posts,
  });
});

const getMyPosts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const posts = await Post.findAll({
    where: {
      userId: sessionUser.id,
      status: "active",
    },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });

  res.status(200).json({
    status: "sucess",
    posts,
  });
});

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  getMyPosts,
};
