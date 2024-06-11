// src/controllers/endpoint1Controller.js
const axios = require('axios');
const config = require('../config');

exports.handleRequest = async (req, res) => {
    const pathName = req.path?.split('/')[1];
    try {
        const usersapi = config.endpoints.find(endpoint => endpoint.name === pathName);
        // console.log({usersapi, path:req.path, body: req.body, method:req.method});
        const response = await axios({
            method: req.method,
            url: `${usersapi.url}${req.path}`,
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).send('Error routing to usersapi');
    }
};
