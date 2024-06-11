const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');
const app = express();
const PORT= 4001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',routes);

// Basic 404 handler
// app.use((req, res) => {
//     res.status(404).send({
//       message: 'The requested URL could not be found.',
//       statusCode: 404,
//     });
// });

mongoose.connect(config.MONGO_URI, {
    bufferCommands: true,
    dbName:"UserService",
    autoIndex: true,
    autoCreate: true
})
.then(()=>{
    console.log("Mongodb is Connected")
    app.listen(PORT, ()=>{
        console.log(`UserService is running on port ${PORT}`);
    })
})
.catch((error)=> {
    console.error(`MongoDB connection error: ${error}`);
})



