var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var {isEmail} = require('validator');

var User = new Schema({
    email:{
        type:String,
        required:[true,"please the email is required "],
        unique:[true,"this email already exists in the database"],
        lowercase:true,
        validate:[isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please the password is required"],
        minlength:[7,"the length of the password should be at least 7 characters"]
    }
});

//what come after saving a user
User.post("save",(doc,next)=>{
    console.log("User saved ",doc);
    next();
});


//waht come before saving a user
User.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
});

module.exports.user = mongoose.model("users",User);