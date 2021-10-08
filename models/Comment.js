const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
    maxlength: 1000,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
