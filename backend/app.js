import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import User from "./models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

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
        const token=await jwt.sign({email:user.email},process.env.JWT_SECRET);

        return res.json({
            message:"Login successful",
            token:token
        })


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port `)
})
