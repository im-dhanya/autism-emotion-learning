const asyncHandler = require("express-async-handler");
const Children = require("../Models/childrenModel");
const Parent = require("../Models/parentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const RegisterChildern = asyncHandler( async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All Fields Are Not Empty");
    }

    const finduser = await Children.findOne({email});

    if(!finduser){
        const hashedpassword = await bcrypt.hash(password,10);

        const newuser = await Children.create({
            name,
            email,
            password : hashedpassword
        })

        console.log(newuser);
        res.status(201).json({message : "User Registered Successfully"});
    }
    else{
        res.status(400);
        throw new Error({message : "User Exist"})
    }
})



const LoginChildern = asyncHandler( async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All Fields Are Not Empty");
    }

    const finduser = await Children.findOne({email});

    if(finduser && await bcrypt.compare(password,finduser.password)){
        const accesstoken = jwt.sign(
            {
                user : {
                    name,
                    email,
                    password
                }
            },
            process.env.PASSOWRD,
            {expiresIn : "1d"}
        )

        console.log(accesstoken);
        res.status(201).json({
            name,
            email,
            accesstoken
        });
    }else{
        res.status(400).json({message : "Login Failed"});
    }
})


const RegisterParent = asyncHandler( async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All Fields Are Not Empty");
    }

    const finduser = await Parent.findOne({email});

    if(!finduser){
        const hashedpassword = await bcrypt.hash(password,10);

        const newuser = await Parent.create({
            name,
            email,
            password : hashedpassword
        })

        console.log(newuser);
        res.status(201).json({message : "User Registered Successfully"});
    }
    else{
        res.status(400);
        throw new Error({message : "User Exist"})
    }
})



const LoginParent = asyncHandler( async (req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All Fields Are Not Empty");
    }

    const finduser = await Parent.findOne({email});

    if(finduser && await bcrypt.compare(password,finduser.password)){
        const accesstoken = jwt.sign(
            {
                user : {
                    name,
                    email,
                    password
                }
            },
            process.env.PASSOWRD,
            {expiresIn : "1d"}
        )

        console.log(accesstoken);
        res.status(201).json({
            name,
            email,
            accesstoken
        });
    }else{
        res.status(400).json({message : "Login Failed"});
    }
})

module.exports = {RegisterChildern,LoginChildern,RegisterParent,LoginParent};