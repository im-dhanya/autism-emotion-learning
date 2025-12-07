const mongoose = require("mongoose");

const childrenModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})


const model = mongoose.model("Children",childrenModel);

module.exports = model;