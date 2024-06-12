const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const config = require('../config');
class UserController {
    static async SignUp(req, res){
        // console.log({method:req.method, body:req.body});
        try {
            const user = await UserModel.findOne({ email:req.body?.email });
            if(user) return res.status(400).json({ message: "User already exists" });
            const newUser= await UserModel.create(req.body);
            const token =jwt.sign({id: newUser.id }, config.SECRET_KEY, { expiresIn: "2h" });
            res.status(201).json({id: newUser.id, email:newUser.email, fullName:newUser.fullName, token});
        } catch (error) {
            res.status(500).json({ error, message: "Server error" });  
        }
    };
    static async SignIn(req, res){
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({ email });
            if(!user){
                res.status(400)
                .json({ values: null, success: false, message: "User not found" });
            }else {
                const match = user.comparePassword(password);
                if(!match){
                    res.status(400)
                    .json({ values: null, success: false, message: "Wrong crendetials" });
                }
                const token =jwt.sign({id: newUser.id }, config.SECRET_KEY, { expiresIn: "2h" });
                res.status(201).json({id: newUser.id, email:newUser.email, fullName:newUser.fullName, token});
            }
        } catch (error) {
            res.status(500).json({ error, message: "Server error" });   
        }
    }
    static async getUsers(req, res) {
        try {
           const users = await UserModel.find({}).exec();
           res.status(200).json({success:true, data: users }); 
        } catch (error) {
            res.status(500).json({ error, message: "Server error" });
        }
    }
}
module.exports= UserController;