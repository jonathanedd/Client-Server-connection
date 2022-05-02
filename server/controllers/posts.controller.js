const { Post } = require('../models/post.model');
const { User } = require('../models/user.model')


//HTTP GET
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User }]
        });

        res.status(201).json({
            posts
        })

    } catch (error) {
        console.log(error);
    };
};


//HTTP POST
const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = await Post.create({
            title,
            content,
            userId
        });

        res.status(201).json({
            newPost
        });

    } catch (error) {
        console.log(error);
    };
};

//HTTP GET
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findOne({where: { id }});

        res.status(201).json({
            post
        })

    } catch (error) {
        console.log(error);
    };
};

//HTTP UPDATE
const updatePost = async (req, res) => {
    try {
        const { post } = req;
        const { title, content } = req.body;

        await post.update({ title, content});

        res.status(201).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
    }
};


//HTTP DELETE
const deletePost = async (req, res ) => {
    try {
        const { post } = req;
        await post.update({
            status: 'Deleted'
        });

        res.status(201).json({
            status: 'success'
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllPosts , createPost, getPostById, updatePost, deletePost };