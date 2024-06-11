const express = require('express');
const loadBalancerMiddleware = require('../middlewares');
const router = express.Router();

router.use(loadBalancerMiddleware);

module.exports = router;
