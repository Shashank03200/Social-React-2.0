const router = require("express").Router();
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const User = require("../models/User");

// Update a user info
router.post("/:id", auth, async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      // If the password is getting updated

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, hash);
      }

      await User.findByIdAndUpdate(req.body.userId, { $set: req.body });
      res.status(200).json("Your account details have been updated.");
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(500).json("You can update only your account");
  }
});

// Delete a user
// /api/users/:id
router.delete("/:id", auth, async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    // Finding the user using the userId
    try {
      const user = await User.findById(req.params.id);
      let isMatching = undefined;
      if (user) {
        // If user is found check for the password
        isMatching = await bcrypt.compare(req.body.password, user.password);
      }

      if (isMatching) {
        User.findByIdAndDelete(req.body.userId, (err, docs) => {
          if (err) {
            res.status(401).json("Something went wrong");
          } else {
            res.status(200).json("Account Deleted Successfully");
          }
        });
      } else {
        res.status(401).json("Invalid password");
      }
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(500).json("You can delete only your account");
  }
});

// Follow a user
router.post("/:id/follow", auth, async (req, res) => {
  if (req.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);
      console.log(userToFollow.followers.includes(req.params.id));

      if (!userToFollow.followers.includes(req.userId)) {
        await currentUser.updateOne({ $push: { following: req.params.id } });
        await userToFollow.updateOne({ $push: { followers: req.userId } });
        res.status(200).json("Followed successfully");
      } else {
        res.status(400).json("You already follow this user.");
      }
    } catch (err) {
      res.status(500).json("Something went wrong.");
    }
  } else {
    res.status(500).json("You cannot follow yourself");
  }
});

// Unfollow a user
router.post("/:id/unfollow", auth, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (userToUnfollow.followers.includes(req.body.userId)) {
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });
        res.status(200).json("Unfollowed successfully");
      } else {
        res.status(400).json("You dont follow this user.");
      }
    } catch (err) {
      res.status(500).json("Something went wrong.");
    }
  } else {
    res.status(500).json("You cannot unfollow yourself");
  }
});

// Get all the users
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({}).limit(30);

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json("Cannot fetch users");
  }
});

// Get the user details
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const { password, createdAt, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      return res.status(404).json("No user found.");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
