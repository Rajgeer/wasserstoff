const { usercontroller, postcontroller } = require('../controllers');

let counter = 0;

module.exports = (req, res, next) => {
    if (req.path.includes('/users')) {
        return usercontroller.handleRequest(req, res);
    } else if (req.path.includes('/posts')) {
        return postcontroller.handleRequest(req, res);
    }
    counter = (counter + 1) % 2;
    if (counter === 0) {
        return usercontroller.handleRequest(req, res);
    } else {
        return postcontroller.handleRequest(req, res);
    }
};
