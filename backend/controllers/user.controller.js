import emailExistence from "email-existence";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import sendEmail from "../utils/sendEmail.js";
import sendMail from "../utils/sendEmail.js";

//register
export const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    console.log(req.body);
   
    try{
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        
        const emailIsValid = await new Promise((resolve, reject) => {
            emailExistence.check(email, function (error, response) {
                if (error) reject(error);
                resolve(response);
            });
        });
        console.log(emailIsValid);
        if (emailIsValid!=true) {
            return res.status(400).json({ message: "Email is not valid" });
        }
        
        
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,email,password:hashedPassword,role
        });
        sendMail(newUser.email,"Registed to CivicSphere successfully!")
        const saveduser=await newUser.save();

        res.json({message:"User registered successfully"});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

//login
export const login=async(req,res)=>{
    
    const {email,password}=req.body;
   
    try{
        const user=await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({success:false,message:"Incorrect password"});
        }
        const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET ,{expiresIn:"5d"});
        return res.cookie("token",token, { httpOnly: true, secure: false }).json({
            message:"Login successful",
            success:true,
            user,
            token:token
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully!",
    });
  };

export const getUser=async(req,res)=>{
    console.log("Hello from get User")
    try{
        const user=await User.findById(req.params.id).select("-password");
        res.json({success:true,user,message:"User fetched successfully"});
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            success:false,
            message: "Server error"
        });
    }
}