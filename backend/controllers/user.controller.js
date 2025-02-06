import emailExistence from "email-existence";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register
export const register=async(req,res)=>{
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
}

//login
export const login=async(req,res)=>{
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
        const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,
            {expiresIn:"7d"} 
        );
        return res.json({
            message:"Login successful",
            token:token
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}