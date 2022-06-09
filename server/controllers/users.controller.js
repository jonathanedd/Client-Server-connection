const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

//bcryptjs encriptacion de cntraseña
const bcrypt = require("bcryptjs");

//JWT import
const jwt = require("jsonwebtoken");

//models
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comments } = require("../models/comment.model");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { storage } = require("../utils/firebase");
const { Email } = require("../utils/email");

//dotenv config
dotenv.config({ path: "./config.env" });

// =========================HTTP FUNCTIONS======================== //

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const imgRef = ref(storage, `users/${req.file.originalname}`);
  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  // bcryptjs: Encriptacion de contraseña
  const salt = await bcrypt.genSalt(12);
  const hashPasword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashPasword,
    role,
    profileImgUrl: imgUploaded.metadata.fullPath,
  });

  await new Email().sendWelcome();

  // to ignore password from response
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  //findAll means SELECT * FROM users
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      { model: Post },
      {
        model: Comments,
        include: [{ model: Post }],
      },
    ],
  }); // this returns an users array

  // MAP ASYNC: to use everytime that you need some async operations inside of an array
  // to get all users Imgs we need to run the array with map()
  const getUserImgsPromises = users.map(async (user) => {
    // create firebase img ref and get the full path
    const imgRef = ref(storage, user.profileImgUrl);
    const imgUrl = await getDownloadURL(imgRef);

    // uupdate the user profileImgUrl property
    user.profileImgUrl = imgUrl;
    return user;
  });

  // How to resolve pending promises from map: ([ Promise{<pending>}, Promise {<pending/>}])
  const userImgResolved = await Promise.all(getUserImgsPromises);

  res.status(201).json({
    users: userImgResolved,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { user } = req;

  // get url from firebase
  const imgRef = ref(storage, user.profileImgUrl);
  const imgUrl = await getDownloadURL(imgRef);

  // Replace profileImgUrl for url in postman
  user.profileImgUrl = imgUrl;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  await user.update({ name });

  res.status(200).json({
    status: "success",
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exist with given email
  const user = await User.findOne({ where: { email, status: "active" } });

  //Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid credentials", 400));
  }

  //JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({
    token,
    user,
  });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
};
