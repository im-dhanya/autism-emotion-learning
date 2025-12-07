const mongoose = require("mongoose");

const surveyModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    }
},
{
    timestamps : true
})

const model = mongoose.model("Survey",surveyModel);
module.exports = model;