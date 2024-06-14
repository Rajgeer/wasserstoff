const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const config = require('./config');
const app = express();
const PORT= 4001;



app.use(bodyParser.json());

app.use('/users',router);
// app.post('/signup', (req, res) =>{
//     console.log({body: req.body});
//     res.send('Success');
// })
// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({
      message: 'The requested URL could not be found.',
      statusCode: 404,
    });
});
app.get('/', (req, res) => {
    res.send("Hello world");
})
mongoose.connect(config.MONGO_URI, {
    bufferCommands: true,
    dbName:"UserService",
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
    console.log(`UserService is running on port ${PORT}`);
})




