const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Post = require("../models/Post");

const auth = require("../middleware/auth");

let sampleImages = [];

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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
router.get("/timeline", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const count = parseInt(req.query.count, 10);

    const currentUser = await User.findById(req.userId);
    const userPosts = await Post.find({ userId: req.userId })
      .sort({
        createdAt: "desc",
      })
      .skip(count * (page - 1))
      .limit(count);
    let friendPosts = [];
    friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
          .sort({ createdAt: "desc" })
          .skip(count * (page - 1))
          .limit(count);
      })
    );

    const totalPosts = userPosts.concat(...friendPosts);

    const finalPosts = totalPosts.map((post) => {
      return {
        ...post._doc,
        deletePossible: post.userId == req.userId,
      };
    });
    res.status(200).json(finalPosts);
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
router.post("/:postId/like", auth, async (req, res) => {
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
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:postId/likestatus", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      if (post.likes.includes(req.userId)) {
        console.log(post._id, " ", "true");
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
