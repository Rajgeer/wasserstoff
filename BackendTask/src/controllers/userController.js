// src/controllers/endpoint1Controller.js
const axios = require('axios');
const config = require('../config');

exports.handleRequest = async (req, res) => {
    const pathName = req.path?.split('/')[1];
    try {
        const usersapi = config.endpoints.find(endpoint => endpoint.name === pathName);
        const response = await axios({
            ...req,
            method: req.method,
            url: `${usersapi.url}${req.path}`,
            data: req.body,
            headers:req.header,
            query:req.query,
            params:req.params
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).send("Error:", error);
    }
};
