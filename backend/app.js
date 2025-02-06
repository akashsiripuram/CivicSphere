import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import User from "./models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import emailExistence from "email-existence"
import { verifyToken } from "./utils/middleware.js";
import Project from "./models/Project.js";

const app = express();

app.use(express.json());

app.post("/api/exist",(req,res)=>{
    emailExistence.check(`${req.body.email}`, function(error, response){
       return res.json(response);
    });
})
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/civicSphere")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection failed:", err));

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.post("/api/register",async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        const emailIsValid = await new Promise((resolve, reject) => {
            emailExistence.check(email, function (error, response) {
                if (error) reject(error);
                resolve(response);
            });
        });

        
        if (emailIsValid!=true) {
            return res.status(400).json({ msg: "Email is not valid" });
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,email,password:hashedPassword
        });

        const saveduser=await newUser.save();
        res.json({msg:"User registered successfully"});


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
app.post("/api/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({msg:"Incorrect password"});
        }
        const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET);

        return res.json({
            message:"Login successful",
            token:token
        })


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//project addition
app.post('/api/addproject',verifyToken,async(req,res)=>{
    const {title,description,category,status,startDate,endDate,members,tasks,images,fundingGoal,donors,paymentLink}=req.body;
    try{
    const createdBy=req.user.id;
    console.log(createdBy);
    const newProject=new Project({
        title,description,category,status,startDate,endDate,members,createdBy,tasks,images,fundingGoal,donors,paymentLink
    });
    const savedProject=await newProject.save();
    res.json(savedProject);
}catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
}


})
//get projects
app.get("/api/getprojects",async (req,res)=>{
    try{
        const projects=await Project.find().sort({createdAt: -1});
        res.json(projects);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port `)
})
