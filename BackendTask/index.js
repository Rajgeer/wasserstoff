const express = require('express');
require('dotenv');
// const router = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
// app.use('/apis', router);
app.get('/home', (req, res) => {
    res.send('Welcome to Home');
})
app.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
});
