require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var morgan = require("morgan");
require("./helpers/init_mongodb");
require("./helpers/init_redis");

const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/users.route");
const postRouter = require("./routes/posts.route");
const commentRouter = require("./routes/comment.route");

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
