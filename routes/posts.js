const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Post = require("../models/Post");

const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
let sampleImages = [];

//Create the storage

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("File", file);
    callback(null, "./client/public/assets/uploads/posts");
  },
  filename: (req, file, callback) => {
    const currentFileName =
      Date.now() + "_" + file.originalname.split(" ").join("-");
    sampleImages.push(currentFileName);

    if (sampleImages.length > 1) {
      fs.unlinkSync(
        "./client/public/assets/uploads/posts/" + sampleImages.shift(),
        (err) => {
          if (err) console.log(err);
          else console.log("Deleted file");
        }
      );
    }
    callback(null, currentFileName);
  },
});

const upload = multer({ storage: storage });

// Get all timeline posts
router.post("/timeline", async (req, res) => {
  try {
    console.log(req.body.userId);
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: req.body.userId }).sort({
      createdAt: "desc",
    });
    let friendPosts = [];
    friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId }).sort({ createdAt: "desc" });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new post
router.post("/newpost", auth, upload.single("postImage"), async (req, res) => {
  try {
    const userId = req.userId;
    const desc = req.body.desc;
    const postImage = req.file.filename;
    console.log(userId, desc, postImage);
    const newPost = await new Post({
      userId,
      desc,
      postImage,
    });
    console.log("New Post: ", newPost);
    console.log(req.body.confirm);
    if (req.body.confirm === "1") {
      console.log("COnfirmedd");
      sampleImages = [];
      const uploadedPost = await newPost.save();
      console.log("Uploaded Post", uploadedPost);
      return res.status(200).json(uploadedPost);
    }
    return res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post

// Delete a post
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId == req.body.userId) {
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
router.post("/:postId/like", auth, async (req, res) => {
  console.log("Server Reached");

  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
