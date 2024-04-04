const mongoose = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const { generateToken } = require("../service/authentication");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    salt : {
        type : String
    }
} , {timeseries : true});

userSchema.static("matchPasswordAndGenerateToken" , async function(email , password){
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User does not Exist")
        
    }
    const userProvidedPasswordHash = createHmac('sha256' , user.salt).update(password).digest('hex');
    if(userProvidedPasswordHash !== user.password){
        throw new Error("Wrong Password");
    }
    const token = generateToken(user);
    user.password = null;
    user.salt = null;
    const returnInfo = {
        token,
        user
    }
    return returnInfo;
})


userSchema.pre('save' , function (next){
    
    const user = this
    if(!user.isModified("password"))  return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256' , salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
    
})

const User = mongoose.model("user" , userSchema);




module.exports = User;