const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth')

router.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(500).json("User already registered. Try logging in!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({
            name, email, password
        });
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();

        // Generate access token
        jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN, (err, token) => {
            if (err) res.status(401).json(err);
            res.status(200).json({ user: savedUser, token });
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        !isPasswordValid && res.status(401).json("Wrong password!");

        // Generate an access token
        jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, (err, token) => {
            if (err) res.status(401).json("Token could not be generated");
            res.status(200).json({ user, token });
        })

    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get("/user", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const { password, ...userData } = await user._doc;
        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json("User not found");
    }

});

module.exports = router;