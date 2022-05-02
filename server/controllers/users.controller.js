const { validationResult } = require('express-validator');


//models 
const { User } = require('../models/user.model');


const getAllUsers = async (req, res) => {
    try {
        //findAll means SELECT * FROM users
        const users = await User.findAll(); // this returns an users array

        res.status(201).json({
            users,
        });

    } catch (error) {
        console.log(error);
    }
};



const createUser = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;

        //Validation
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            const messages = errors.array().map( error => {
                return error.msg
            });

            const errorMsg = messages.join('. ');

            return res.status(400).json({
                status: 'error',
                message: errorMsg,
            })
        }
        
        const newUser = await User.create({
            name: name,
            email: email,
            password
        })

        res.status(201).json({ newUser })

    } catch (error) {
        console.log(error);
    }

    
};

const getUserById = async (req , res ) => {
    try{
        const { user } = req;
        // const { id } = req.params;
        //SELECT * FROM users WHERE id = ? 
        // const user = await User.findOne({ where : { id } }); 
        // This only finds the first criterea for 
        
        res.status(200).json({
            user,
        })

    }catch (error ){
        console.log(error);
    }
};



const updateUser = async (req, res) => {
    try {
        // const { id } = req.params;
        const { user } = req;
        const { name } = req.body;
        // const user = await User.findOne({ where: { id }});

        await user.update({name})

        res.status(200).json({
            status: 'success'
        })

    } catch (error) {
        console.log(error);
    }
};


const deleteUser = async (req, res ) => {
    try {
        // const { id } = req.params;

        const { user } = req;

        // const user = await User.findOne({ where: { id }});

        

        // await user.destroy();
        await user.update({ status: 'deleted'});

        res.status(200).json({
            status: 'success'
        })

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser 
};

