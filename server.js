require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

var morgan = require("morgan");
require("./helpers/init_mongodb");
require("./helpers/init_redis");

const app = express();
app.use(express.json());
app.use(
  "/public",
  express.static(
    path.join(__dirname, "client", "public", "assets", "uploads", "posts")
  )
);

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

// Error Response Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Code to be used in production / deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "public", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
