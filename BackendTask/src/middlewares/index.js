// src/middlewares/loadBalancerMiddleware.js
const { userController, postController } = require('../controllers');

let counter = 0;

module.exports = (req, res, next) => {
    // Example: Route based on URL pattern
    if (req.path.startsWith('/users')) {
        return userController.handleRequest(req, res, next);
    } else if (req.path.startsWith('/posts')) {
        return postController.handleRequest(req, res, next);
    }

    // Simple round-robin logic
    counter = (counter + 1) % 2;
    if (counter === 0) {
        return userController.handleRequest(req, res, next);
    } else {
        return postController.handleRequest(req, res, next);
    }
};
