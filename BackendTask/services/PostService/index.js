const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const PostModel = require('./src/models/PostModel');
const {verifyToken} = require('./middleware');
const app = express();
const PORT = 4002;

app.use(bodyParser.json());
// app.use('/posts', router);

app.post('/posts', verifyToken, async(req, res) => {
  console.log('Query', req.query);
  console.log("Headers", req.headers);
  try {
    console.log({body:req.body, userId:req.query.userId});
    const { title, content } = req.body;
    const post = new PostModel({ title, content, userId:req.query.userId });
    await post.save();
    res.status(201).json({ message: "Post add success", data:post });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
});
app.get('/posts', verifyToken, async(req, res)=> {
  try {
    const posts = await PostModel.findOne({userId:req.query.userId}).exec();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
});
// Basic 404 handler
app.use((req, res) => {
  res.status(404).send({
    message: "The requested URL could not be found.",
    statusCode: 404,
  });
});

mongoose
  .connect(config.MONGO_URI, {
    bufferCommands: true,
    dbName: "PostService",
    autoIndex: true,
    autoCreate: true,
  })
  .then(() => {
    console.log("Mongodb is Connected");
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
  });

app.listen(PORT, () => {
  console.log(`PostServer is running on port ${PORT}`);
});
