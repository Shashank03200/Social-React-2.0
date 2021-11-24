const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const createError = require("http-errors");

const { verifyAccessToken } = require("../helpers/jwt_auth");

// Update a user info
router.post("/:id", verifyAccessToken, async (req, res, next) => {
  try {
    if (req.userId === req.params.id || req.body.isAdmin) {
      // If the password is getting updated

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      await User.findByIdAndUpdate(req.userId, { $set: req.body });
      res.status(200).json("Your account details have been updated.");
    } else {
      throw createError.BadRequest("You can only update your account details");
    }
  } catch (err) {
    next(createError.InternalServerError());
  }
});

// Delete a user
// /api/users/:id
router.delete("/:id", verifyAccessToken, async (req, res, next) => {
  try {
    if (req.userId == req.params.id || req.body.isAdmin) {
      // Finding the user using the userId
      const user = await User.findById(req.params.id).select("+password");
      let isMatching = await user.isValidPassword(req.body.password);

      // removing this user from the follower list of other users so that their follower is not a non exisiting user.
      if (isMatching) {
        const followingUserList = await user.following;
        const removeFromFollowerListPromises = followingUserList.map(
          (otherUser) => {
            return User.updateOne(
              { _id: otherUser._id },
              { $pull: { followers: req.userId } }
            );
          }
        );

        const removeFromFollower = await Promise.all(
          removeFromFollowerListPromises
        );

        // removing this user from the following list of other users so that they dont follow a non existing user
        const followersUserList = await user.followers;
        const removeFromFollowingListPromise = followersUserList.map(
          (otherUser) => {
            return User.updateOne(
              { _id: otherUser._id },
              { $pull: { following: req.userId } }
            );
          }
        );

        const removeFromFollowing = await Promise.all(
          removeFromFollowingListPromise
        );

        User.findByIdAndDelete(req.userId, (err, docs) => {
          if (err) {
            console.log(err);
            throw createError.NotFound();
          } else {
            res.status(200).json("Account Deleted Successfully");
          }
        });
      } else {
        throw createError.Unauthorized();
      }
    } else {
      throw createError.Unauthorized("You can only delete your account");
    }
  } catch (err) {
    next(err);
  }
});

// Follow a user
router.post("/:id/follow", verifyAccessToken, async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);

      if (!userToFollow.followers.includes(req.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.userId } });
        if (!currentUser.following.includes(req.params.id)) {
          await currentUser.updateOne({ $push: { following: req.params.id } });
        }

        res.status(200).json("Followed successfully");
      } else {
        res.status(400).json("You already follow this user.");
      }
    } else {
      throw createError.BadRequest("Action not allowed");
    }
  } catch (err) {
    next(err);
  }
});

// Unfollow a user
router.post("/:id/unfollow", verifyAccessToken, async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);

      if (userToUnfollow.followers.includes(req.userId)) {
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        await userToUnfollow.updateOne({
          $pull: { followers: req.userId },
        });
        res.status(200).json("Unfollowed successfully");
      } else {
        res.status(400).json("You dont follow this user.");
      }
    } else {
      res.status(400).json("You cannot unfollow yourself.");
    }
  } catch (err) {
    next(err);
  }
});

// Get all the users
router.get("/all", verifyAccessToken, async (req, res) => {
  try {
    const allUsers = await User.find({}).limit(5);

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json("Cannot fetch users");
  }
});

module.exports = router;
