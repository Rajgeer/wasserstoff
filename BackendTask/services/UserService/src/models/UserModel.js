const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    id:String,
    fullName:{type:String, length:50, required: true},
    email:{type: String, length:100,  required:true},
    password:{type: String, required: true},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});
userSchema.set("toObject", { virtuals: true });
userSchema.pre("save", function preSave(next){
    if(!this.isModified('password')){
       next();
    }else {
        bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(this.password, salt))
        .then((hash) => {
            this.password = hash;
            next()
        })
        .catch(next)
    }
});
/**
 * Adds a method on the user object which we can use
 * to compare a user's password with.
 */
userSchema.method('comparePassword' , function comparePassword(candidate) {
    if (!this.password) {
        throw new Error("User has not been configured with a password.");
    }
    if (!candidate) {
        return false;
    }
    return bcrypt.compare(candidate, this.password);
})
module.exports = mongoose.model('User', userSchema);
