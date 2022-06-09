//1. Import express through require method
const express = require("express");
const cors = require("cors");

const rateLimit = require("express-rate-limit");

const path = require("path");

// Controllers
const { globalErrorHandler } = require("./controllers/errors.controller");

//Rouetrs
const { usersRouter } = require("./routes/users.routes");
const { postsRouter } = require("./routes/posts.route");
const { commentsRouter } = require("./routes/comments.route");
const { viewsRouter } = require("./routes/views.routes");

//2. create instance express app in app variable
const app = express();

//Enable CORS
app.use(cors());

//11.Enable incoming JSON data
app.use(express.json());

// enable statics assets
app.use(express.static("public"));

// set pug as template engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// enable incoming form-data
app.use(express.urlencoded({ extended: true }));

//Limit IP Request
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: "Too many petitions",
});

app.use(limiter);

// Endpoints
// http://localhost:4000/api/v1/users
app.use("/", viewsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

// Global error handler
app.use("*", globalErrorHandler);

module.exports = { app };
