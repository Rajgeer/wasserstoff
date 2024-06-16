const express = require('express');
const router = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/apis', router);
app.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
});
