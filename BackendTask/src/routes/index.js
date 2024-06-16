const express = require('express');
const loadBalancerMiddleware = require('../middlewares');
const router = express.Router();

router.use(loadBalancerMiddleware);
router.get('/home', (req, res) => {
    res.send("Welcome in home");
})
module.exports = router;
