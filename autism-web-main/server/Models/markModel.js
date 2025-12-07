const mongoose = require("mongoose");

const markModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    marks : {
        type : String,
        required : true
    }
},
{
    timestamps : true
});

const model = mongoose.model("Mark",markModel);
module.exports = model;