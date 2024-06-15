const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const PostModel = require('./models/PostModel');
const app = express();
const PORT = 4002;

app.use(bodyParser.json());

app.post("/posts", async (req, res) => {
  try {
    const newPost = await PostModel.create({...req.body});
    res.status(201).json({ message: "Post add success", data:newPost });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.findById({userId:req.body?.userId}).exec();
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
