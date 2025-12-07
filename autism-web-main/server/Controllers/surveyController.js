const asyncHandler = require("express-async-handler");
const Survey = require("../Models/surveyModel");

const SurveyModel = asyncHandler( async(req,res)=>{

    const {name,level,content} = req.body;

    if(!name || !level || !content){
        res.status(400);
        throw new Error("All Fields Are Not Empty");
    }

    const finduser = await Survey.findOne({name});

    if(finduser){
        res.status(400);
        throw new Error("Name Exist. Use Another Name");
    }else{
        const newsurvey = await Survey.create({
            name,
            level,
            content
        });

        console.log(newsurvey);
        res.status(201).json(newsurvey)
    }
});

module.exports = {SurveyModel};