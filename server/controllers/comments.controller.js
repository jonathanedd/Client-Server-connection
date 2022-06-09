const { catchAsync } = require("../utils/catchAsync");

// models
const { Comments } = require('../models/comment.model');






const getAllCommets = catchAsync( async ( req, res, next) => {
    const comments = await Comments.findAll({
        where: { status: 'active'}
    });
    
    res.status(201).json(({
        comments
    }))
});


const createComment = catchAsync( async ( req, res, next) => {
    const { text } = req.body;
    const { postId } = req.params;
    const { sessionUser } = req;

    const newComment = await Comments.create({
        text,
        postId,
        userId: sessionUser.id
    });

    res.status(201).json({
        newComment
    })

});


const getCommentById = catchAsync( async ( req, res, next) => {
    const { comment } = req;

    res.status(200).json({
        comment
    })
});


const updateComment = catchAsync( async ( req, res, next) => {
    const { text} = req.body;
    const { comment } = req.params;

    await comment.update({
        text
    });

    res.status(200).json({
        status: 'success'
    })
});


const deleteComment = catchAsync( async ( req, res, next) => {
    const { comment } = req;

    await comment.update({
        status: 'deleted'
    })

    res.status(200).json({
        status: 'success'
    })
});


module.exports = {
    getAllCommets,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
}