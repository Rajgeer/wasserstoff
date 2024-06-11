const express = require('express');
const UserController = require('../controller/user');
const router = express.Router();

router.post('/signup', UserController.SignUp);
router.post('/signin', UserController.SignIn);
router.get('/', UserController.getUsers);
module.exports=router;