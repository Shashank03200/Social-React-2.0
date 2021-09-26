const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(500)
        .json({ error: true, msg: "User already registered. Try logging in!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      username,
      email,
      password,
    });
    newUser.password = hashedPassword;
    const savedUser = await newUser.save();

    // Generate access token
    jwt.sign(
      { id: savedUser._id },
      process.env.JWT_ACCESS_SECRET,

      (err, token) => {
        if (err)
          res.status(401).json({ error: true, msg: "Unauthorized user" });
        res.status(200).json({ sucess: true, token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: true, msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    !isPasswordValid &&
      res.status(401).json({ error: true, msg: "Wrong Password" });

    // Generate an access token
    jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, (err, token) => {
      if (err)
        res
          .status(401)
          .json({ error: true, msg: "Token could not be generated" });
      res.status(200).json({ success: true, token });
    });
  } catch (err) {
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

// router.delete("/delete", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { password, ...userData } = await user._doc;
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json("User not found");
  }
});

module.exports = router;
