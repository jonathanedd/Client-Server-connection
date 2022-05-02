const express = require('express');

//middlewares
const { existPost } = require('../middlewares/posts.middleware');

//Controllers
const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/posts.controller');


//router
const router = express.Router();


//Endpoints
router.get('/', getAllPosts);
router.post('/', createPost );
router.get('/:id', getPostById);
router.patch('/:id',existPost, updatePost);
router.delete('/:id', existPost, deletePost);



//Export
module.exports= { postsRouter: router};