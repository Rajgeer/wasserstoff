const PostModel = require('../models/PostModel');
module.exports = class PostController {

    static async addPost(req, res){
        try {
            const {userId} = req.query;
            // console.log(req);
            const newPost = await PostModel.create({...req.body, userId});
            // res.send('Add new post')
            res.status(201).json({message:'Post add success', data:newPost});
        } catch (error) {
            res.status(500).json({ error, message: "Server error" });  
        }
    }
    // Now, let's say we want to get the number of posts per user:
    static async getPosts(req, res) {
        try {
            const {userId}=req.query;
            const posts = await PostModel.aggregate([
                {
                  $group: {
                    _id:`${userId}`,
                    totalPosts: { $sum: 1 }
                  }
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                  }
                },
                {
                  $unwind: "$user"
                },
                {
                  $project: {
                    userName: "$user.fullName",
                    totalPosts: 1
                  }
                }
              ]).exec();
              
           res.status(200).json({success:true, data: posts }); 
        } catch (error) {
            res.status(500).json({ error, message: "Server error" });
        }
    }
}