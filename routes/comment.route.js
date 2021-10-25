const router = require("express").Router();
const mongoose = require("mongoose");
const createError = require("http-errors");

const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

const { verifyAccessToken } = require("../helpers/jwt_auth");

router.get("/:postId/all", verifyAccessToken, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "_id username profileImage",
      },
    });

    if (post) {
      const comments = post.comments;

      const finalComments = comments.map((comment) => {
        return {
          ...comment._doc,
          isRemovable: comment.userId.toString() === req.userId.toString(),
        };
      });
      res.status(200).json(finalComments);
    } else {
      throw createError.NotFound();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:postId/new", verifyAccessToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    console.log(post.id);
    const newComment = await new Comment({
      userId: req.userId,
      postId: post.id,
      commentText: req.body.commentText,
    });
    const savedComment = await newComment.save();

    if (post) {
      post.comments.push(savedComment._id);
      const updated = await post.save();
      const completeComment = await Comment.findById(savedComment.id).populate(
        "userId"
      );
        
      res.status(200).json(completeComment);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:postId/latest", verifyAccessToken, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId, {
      comments: { $slice: -2 },
    }).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "_id username profileImage",
      },
    });

    if (post.comments.length === 0) {
      post = await Post.findById(req.params.postId)
        .populate("userId")
        .populate("comments");
    }

    if (post) {
      const defaultComments = post.comments;
      let comments = [];
      console.log(defaultComments);
      comments = defaultComments.map((comment) => {
        return {
          ...comment._doc,
          isRemovable: comment.userId.toString() === req.userId.toString(),
        };
      });

      res.status(200).json(comments);
    } else {
      res.status(404).json({ error: true, message: "Post details not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:commentId", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.userId;
    const objectId = mongoose.Types.ObjectId;
    const post = await Post.findById(req.body.postId).populate("comments");
    if (post) {
      console.log(post);
      // const comments = await post.comments;
      post.comments.pull(req.params.commentId, (err, res) => {
        console.log(res);
        post.save();
      });
      // console.log(comment);

      // if (!comment) {
      //   throw createError.BadRequest();
      // }
      // if (comment.userId !== userId) {
      //   console.log(typeof comment.userId);
      //   console.log(typeof userId);
      //   throw createError.Unauthorized();
      // }
      // post.comments
      //   .id(commentId.toString())
      //   .remove()
      //   .then(() => {
      //     console.log(typeof commentId);
      //     res.json("Comment Deleted Successfully");
      //   })
      //   .catch((err) => {
      //     throw createError.InternalServerError();
      //   });
    } else {
      throw createError.BadRequest();
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
