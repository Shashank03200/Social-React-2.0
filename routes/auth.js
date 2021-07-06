const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

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
        res.status(200).json(savedUser);
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
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;