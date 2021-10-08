const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");
const User = require("../models/User");

const fetchUserDataViaCommentId = async (req, commentIds) => {
  const commentPromises = commentIds.map((_id) => Comment.findOne({ _id }));

  const comments = await Promise.all(commentPromises);

  const commentedUserPromises = comments.map(async (comment) => {
    return User.findById(comment.userId);
  });
  const commentedUsers = await Promise.all(commentedUserPromises);

  const commentsWithUserDetails = [];

  for (let i = 0; i < comments.length; i++) {
    const completeObject = {
      ...comments[i]._doc,
      ...commentedUsers[i]._doc,
    };

    const { profileImage, username, commentText, _id } = completeObject;
    console.log(completeObject);
    commentsWithUserDetails.push({
      profileImage,
      username,
      commentText,
      _id,
      isRemovable: completeObject.userId === req.userId,
    });
  }

  return commentsWithUserDetails;
};

router.get("/:postId/all", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("comments");
    if (post) {
      let commentsWithUserDetails = [];
      const commentIds = post.comments;
      commentsWithUserDetails = await fetchUserDataViaCommentId(
        req,
        commentIds
      );
      res.status(200).json({ success: true, commentsWithUserDetails });
    } else {
      res.status(404).json({ error: true, message: "Post details not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/:postId/new", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    const newComment = await new Comment({
      userId: req.userId,
      commentText: req.body.commentText,
    });
    const savedComment = await newComment.save();

    if (post) {
      post.comments.push(savedComment._id);
      const updated = await post.save();

      res.status(200).json({ updated });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:postId/latest", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      let commentIds = [];

      if (post.comments.length >= 2)
        commentIds = [
          post.comments[post.comments.length - 2],
          post.comments[post.comments.length - 1],
        ];
      else if (post.comments.length === 1)
        commentIds = [post.comments[post.comments.length - 1]];
      else if (post.comments.length === 0)
        return res
          .status(200)
          .json({ success: true, commentsWithUserDetails: [] });
      let commentsWithUserDetails = [];
      commentsWithUserDetails = await fetchUserDataViaCommentId(
        req,
        commentIds
      );
      res.status(200).json({ success: true, commentsWithUserDetails });
    } else {
      res.status(404).json({ error: true, message: "Post details not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const objectId = mongoose.Types.ObjectId;
    const post = await Post.findById(req.body.postId).populate("comments");

    if (post) {
      const removedComment = await Post.findByIdAndUpdate(req.body.postId, {
        $pull: { comments: { _id: objectId(req.params.commentId) } },
      });

      res.status(200).json(removedComment);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
