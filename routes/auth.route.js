const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const createError = require("http-errors");

const { registerSchema, loginSchema } = require("../helpers/validation_schema");
const User = require("../models/User");
const client = require("../helpers/init_redis");

const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt_auth");

router.post("/register", async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const foundUser = await User.findOne({ email: result.email });

    if (foundUser) {
      throw createError.Conflict(`${result.email} is already registered`);
    }

    const usernameDuplicate = await User.findOne({ username: result.username });

    if (usernameDuplicate) {
      throw createError.Conflict(
        `The username ${result.username} is  already taken`
      );
    }
    const newUser = await new User(result);
    console.log(newUser);
    const savedUser = await newUser.save();
    // Generate access accessToken

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);
    res.send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email }).select(
      "+password"
    );
    if (!user) {
      throw createError.NotFound("Your account is not registered");
    }
    console.log(user);
    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Invalid email or password");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post("/refreshToken", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);
    console.log("UserId : ", userId);
    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res.send({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    client.DEL(userId, (err, val) => {
      if (err) {
        console.log(err.message);
        throw createError.InternalServerError();
      } else console.log(val);
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/user", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { password, ...userData } = await user._doc;
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json("User not found");
  }
});

module.exports = router;
