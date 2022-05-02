// This file defines the HTTP verbs and API endpoints 
const express = require('express');

//express validator 
const { body } = require('express-validator');




//middlewares
const { userExist } = require('../middlewares/users.middleware');
const { createUserValidation, checkValidations } = require('../middlewares/validations.middleware');

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

//expree validator for name at createUser 
router.post(
    '/',
    // body('name').notEmpty().withMessage('Name cannot be empty'),
    // body('email')
    //     .notEmpty()
    //     .withMessage('Email cannot be empty')
    //     .isEmail().withMessage('Invalid email'),
    // body('password')
    //     .notEmpty()
    //     .withMessage('Password cannot be empty')
    //     .isLength({ min: 8})
    //     .withMessage('Password Must be 8 characters'),
    createUserValidation,
    checkValidations,
    createUser 
    );

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
