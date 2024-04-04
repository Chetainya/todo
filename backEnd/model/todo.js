const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    task : {
        type : String,
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    }
} , {timestamps : true});

const todoModel = mongoose.model("todo" , todoSchema);

module.exports = todoModel;