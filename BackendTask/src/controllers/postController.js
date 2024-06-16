// src/controllers/endpoint2Controller.js
const axios = require('axios');
const config = require('../config');

exports.handleRequest = async (req, res) => {
    const pathName = req.path?.split('/')[1];
    try {
        const postapis = config.endpoints.find(endpoint => endpoint.name === pathName);
        const response = await axios({
            method: req.method,
            url: `${postapis.url}${req.path}`,
            data: req.body,
            headers:req.headers,
            params:req.query
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: 'Service unavailable',
            message: error.message
        });
    }
};
