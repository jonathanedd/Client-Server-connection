// This file defines the HTTP verbs and API endpoints
const express = require("express");

//express validator
const { body } = require("express-validator");

//middlewares
const {
  userExist,
  protectToken,
  protectAdmin,
} = require("../middlewares/users.middleware");

const {
  createUserValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

// controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

//utils
const { upload } = require("../utils/multer");

const router = express.Router();

//Login will not be affected by token request
router.post("/login", login);

//express validator for name at createUser
router.post(
  "/",
  upload.single("profileImg"),
  createUserValidation,
  checkValidations,
  createUser
);

// Apply ptotectToken middleware,
// router.use will apply the protectToken to all of the below middlewares endpoints
router.use(protectToken);

// After copying the enpoints, repleace app for router
router.get("/", protectAdmin, getAllUsers);

// router.get('/:id', getUserById );// After / it can be any value, in this case the id , it i dynamic
// router.patch('/:id', updateUser);// Update user
// router.delete('/:id', deleteUser);//

// Share routes with router.route for same URL
router
  .route("/:id")
  .get(protectAdmin, userExist, getUserById)
  .patch(userExist, updateUser)
  .delete(userExist, deleteUser);

// this is the way to export in node js
module.exports = { usersRouter: router };
