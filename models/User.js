const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      max: 100,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      max: 100,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 50,
      select: false,
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "User",
    },
    following: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "User",
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstSignIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
