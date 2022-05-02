// This file defines the HTTP verbs and API endpoints 
const express = require('express');



//middlewares
const { userExist } = require('../middlewares/users.middleware');

// controller 
const { 
    getAllUsers,
    createUser ,
    getUserById,
    updateUser,
    deleteUser 
} = require('../controllers/users.controller');

const router = express.Router();

// After copying the enpoints, repleace app for router
router.get('/', getAllUsers );

router.post('/', createUser );

// router.get('/:id', getUserById );// After / it can be any value, in this case the id , it i dynamic 

// router.patch('/:id', updateUser);// Update user 

// router.delete('/:id', deleteUser);// 


// Share routes with router.route for same URL 
router.route('/:id')
    .get(userExist,  getUserById )
    .patch( userExist, updateUser )
    .delete( userExist, deleteUser );


// this is the way to export in node js
module.exports = { usersRouter: router }