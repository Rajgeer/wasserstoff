const {handleRequest} = require('../controllers');

module.exports = async(req, res, next) => {
    return await handleRequest(req, res, next);
};
