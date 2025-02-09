import Emergency from "../models/Emergency.js";

export const addEmergency=async(req,res)=>{
    const {type,location,reportedBy,status}=req.body;
    try{
        const newEmergency=new Emergency({type,location,reportedBy,status});
        await newEmergency.save();
        return res.status(201).json({success:true,message:"Emergency reported successfully!",emergency:newEmergency});
    }catch(err){
        return res.status(500).json({success:false,message:"Emergency not sent"});
    }
}

export const getAllEmergencies=async(req,res)=>{
    try{
        const emergencies=await Emergency.find();
        return res.status(200).json({success:true,emergencies});
    }catch(err){
        return res.status(500).json({success:false,message:"Failed to fetch emergencies"});
    }
}