// src/controllers/endpoint2Controller.js
const axios = require('axios');
const config = require('../config');

const postapi = config.endpoints.find(endpoint => endpoint.name === 'posts');

exports.handleRequest = async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${targetService.url}${req.originalUrl}`,
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: 'Service unavailable',
            message: error.message
        });
    }
    // try {
    //     const response = await axios.get(`${postapi.url}${req.path}`);
    //     res.send(response.data);
    // } catch (error) {
    //     res.status(500).send('Error routing to postapi');
    // }
};
