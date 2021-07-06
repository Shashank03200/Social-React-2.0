const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 100,
    },
    password: {
        type: String,
        required: true,
        max: 50
    },
    followers: {
        type: Array,
        default: []

    },
    following: {
        type: Array,
        default: []
    },
    profileImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;