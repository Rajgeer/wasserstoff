const express = require('express');
const loadBalancerMiddleware = require('../middlewares');
const router = express.Router();

router.use(loadBalancerMiddleware);
router.get('/', (req, res) => {
    res.send("Backend task is running");
})

module.exports = router;
