const asyncHandler = require("express-async-handler");
const Mark = require("../Models/markModel");


const StudentMarks = asyncHandler( async (req,res)=>{
    const {name,marks} = req.body;

    if(!name || !marks){
        res.status(400);
        throw new Error("Something Missing");
    }

    const newmark = await Mark.create({
        name,
        marks
    });

    res.status(201).json({newmark});
})

const getMarks = asyncHandler( async (req,res)=>{
    try {
        const name = req.params.name;
        console.log(name)
        const findAll = await Mark.find({name});
        res.status(201).json(findAll);
    } catch (error) {
        console.log(error);
    }
})

module.exports = {StudentMarks,getMarks};