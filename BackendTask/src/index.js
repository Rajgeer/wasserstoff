const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/apis', routes);

app.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
});
