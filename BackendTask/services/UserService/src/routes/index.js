const express = require('express');
const UserController = require('../../controller/user');
const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/page', (req, res)=>{
    res.send("Hello World page");
})
module.exports=router;