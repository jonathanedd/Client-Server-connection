const { User } = require("../models/user.model");

// JWT
const jwt = require("jsonwebtoken");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  // Extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // ['Bearer', 'token'] extraer el token
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Invalid Session", 403));
  }

  // Validatr token ... Decoded returns this :  { id: 2, iat: 1651998095, exp: 1652005295 } ... iat means issued at.
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(new AppError("Owners token is no longer available", 403));
  }

  // share token session information from user
  req.sessionUser = user;

  next();
});

// Middleware that validates user sessions
const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== "admin") {
    return next(new AppError("Access not granted", 403));
  }

  next();
});

// middlewares that validates account owner
const protectAccountOwner = catchAsync(async (req, res, next) => {
  // get curent session user
  // get the id of the user that is goint to be updated

  // compare the id's
  // If ids are equal, the reuest pass
  // if the ids arent equal, return error

  next();
});

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    // return res.status(404).json({
    //     status: 'error',
    //     message: 'User not found with id'
    // });
    return next(new AppError("User not found with id", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist, protectToken, protectAdmin };
