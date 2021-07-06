const router = require('express').Router();

const User = require('../models/User')
const Post = require('../models/Post');

// Get all timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: req.params.userId }).sort({ createdAt: 'desc' });

        friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId }).sort({ createdAt: 'desc' })
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
})

//Create a new post
router.post('/newpost', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json("Post saved");
    } catch (err) {
        res.status(500).json(err)
    }
});

// Update a post


// Delete a post 
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.userId == req.body.userId) {
            await Post.findByIdAndDelete(req.params.postId);
            res.status(200).json("Post deleted.")
        } else {
            res.status(401).json("You can delete only your posts.")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


// Like Unlike a post
router.post('/:postId/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post) {
            if (!post.likes.includes(req.body.userId)) {
                await post.update({ $push: { likes: req.body.userId } });
                res.status(200).json("The post has been liked");
            } else {
                await post.update({ $pull: { likes: req.body.userId } });
                res.status(200).json("The post has been disliked");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a post
router.get("/:postId", async (req, res) => {
    try {
        console.log('Getting Post');
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err.message)
    }
});

module.exports = router;