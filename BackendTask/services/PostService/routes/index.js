const express = require('express');
const PostController = require('../controller/post');
const Authorization = require('../middleware');
const router = express.Router();

router.post('/', Authorization.Provider, PostController.addPost);
router.get('/', Authorization.Provider, PostController.getPosts);
router.get('/page', (req, res) => {
    res.send("Welcome Post page ");
})

module.exports = router;