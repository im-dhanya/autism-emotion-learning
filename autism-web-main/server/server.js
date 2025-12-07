const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConnect } = require("./dbConnection/connectDB");
const PORT = process.env.PORT || 5001;
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

dbConnect();

const userRouter = require("./Routers/userRouter");
const surveyRouter = require("./Routers/surveyRouter");
const markRouter = require("./Routers/markRouter");

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100,
    message : "Too Many Request, Try Again Later"
})

app.use(limiter);


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use("/api/user",userRouter);
app.use("/api/parents",surveyRouter);
app.use("/api/student",markRouter);


app.listen(PORT,()=>{
    console.log(`Server Is Running On The Port Of ${PORT}`);
})