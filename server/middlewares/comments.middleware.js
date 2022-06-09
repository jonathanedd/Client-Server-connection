const { Comments } = require('../models/comment.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');


const commentExist = catchAsync( async(req, res, next) => {
    const { id } = req.params;

    const comment = await Comments.findOne({
        where:{ id, status: 'active'}
    });

    if(!comment){
        return next( new AppError('Comment not found with given ID ', 404));


    };


    req.comment = comment; 
    next();
});


module.exports = { commentExist };