const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");
const Post = require("../models/Post");

const { verifyAccessToken } = require("../helpers/jwt_auth");
const auth = require("../middleware/auth");
const upload = require("../helpers/file_upload");

// Get all timeline posts
router.get("/timeline", verifyAccessToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const count = parseInt(req.query.count, 10);

    const currentUser = await User.findById(req.userId);
    const userPosts = await Post.find({ userId: req.userId })
      .sort({
        createdAt: "desc",
      })
      .skip(count * (page - 1))
      .limit(count)
      .populate("userId");
    let friendPosts = [];
    friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
          .sort({ createdAt: "desc" })
          .skip(count * (page - 1))
          .limit(count)
          .populate("userId");
      })
    );

    const totalPosts = userPosts.concat(...friendPosts);

    const finalPosts = totalPosts.map((post) => {
      return {
        ...post._doc,
        postDeletePossible:
          post.userId._id.toString() === req.userId.toString(),
      };
    });
    res.status(200).json(finalPosts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Create a new post
router.post(
  "/newpost",
  verifyAccessToken,
  upload.single("postImage"),
  async (req, res, next) => {
    try {
      const userId = req.userId;
      const desc = req.body.desc;
      const postImage = req.file.filename;

      // console.log(userId, desc, postImage);
      const newPost = await new Post({
        userId,
        desc,
        postImage,
      });
      console.log(req.body);
      if (req.body.confirm === "1") {
        console.log("NewPost User Id ", userId);
        console.log("NewPost Desc ", desc);
        console.log("New Post PostImage ", postImage);

        console.log("COnfirmedd");
        sampleImages = [];
        const uploadedPost = await newPost.save();
        const foundPost = await Post.findById(uploadedPost.id).populate(
          "userId"
        );
        const completePost = {
          ...foundPost._doc,
          postDeletePossible:
            foundPost.userId.toString() === req.userId.toString(),
        };
        return res.status(200).json(completePost);
      }
      return res.status(200).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

// Update a post

// Delete a post
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId == req.userId) {
      await Post.findByIdAndDelete(req.params.postId);
      fs.unlinkSync("./client/public/assets/uploads/posts/" + post.postImage);
      res.status(200).json("Post deleted.");
    } else {
      res.status(401).json("You can delete only your posts.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like Unlike a post
router.post("/:postId/like", verifyAccessToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post) {
      if (!post.likes.includes(req.userId)) {
        await post.updateOne({ $push: { likes: req.userId } });
        await post.save();
        res
          .status(200)
          .json({ currentState: "liked", msg: "The post has been liked" });
      } else {
        await post.updateOne({ $pull: { likes: req.userId } });
        await post.save();
        res.status(200).json({
          currentState: "disliked",
          msg: "The post has been disliked",
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("comments");
    if (!post) {
      throw createError.NotFound("The post was not found");
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.get("/:postId/likestatus", verifyAccessToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      if (post.likes.includes(req.userId)) {
        return res.status(200).json({ likeState: true });
      } else {
        console.log(post._id, " ", "false");

        return res.status(200).json({ likeState: false });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
