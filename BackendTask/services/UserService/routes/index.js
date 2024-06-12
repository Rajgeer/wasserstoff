const express = require('express');
const UserController = require('../controller/user');
const PostController = require('../controller/post');
const router = express.Router();

router.post('/signup', UserController.SignUp);
router.post('/signin', UserController.SignIn);
router.get('/', UserController.getUsers);
router.get('/posts', PostController.getPosts);
router.post('/posts', PostController.addPost);
module.exports=router;