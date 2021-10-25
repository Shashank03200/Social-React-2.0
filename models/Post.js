const mongoose = require("mongoose");
const commentSchema = require("./Comment");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    desc: {
      type: String,
      max: 500,
    },
    postImage: {
      type: String,
      default: "",
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "User",
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
