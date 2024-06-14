const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const config = require('./config');
const app = express();
const PORT= 4002;

app.use(bodyParser.json());

app.use('/posts', router);

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({
      message: 'The requested URL could not be found.',
      statusCode: 404,
    });
});

mongoose.connect(config.MONGO_URI, {
    bufferCommands: true,
    dbName:"PostService",
    autoIndex: true,
    autoCreate: true
})
.then(()=>{
    console.log("Mongodb is Connected")
})
.catch((error)=> {
    console.error(`MongoDB connection error: ${error}`);
});
app.listen(PORT, ()=>{
    console.log(`PostServer is running on port ${PORT}`);
})





