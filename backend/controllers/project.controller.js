import Project from "../models/Project.js";
import sendMail from "../utils/sendEmail.js";
import User from "../models/User.js";

async function updatePoints(userId, pointsToAdd, reason) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { points: pointsToAdd }, // Increment points
        $push: { // Add log entry
          logs: {
            pointsAdded: pointsToAdd,
            reason,
            date: new Date(),
          },
        },
      },
      { new: true } // Return the updated document
    );

    console.log('Updated user points:', user);
    return user;
  } catch (error) {
    console.error('Error updating points:', error);
    throw error;
  }
}

//add project
export const addProject = async (req, res) => {
  console.log("addProject");
  const {
    title,
    description,
    category,
    startDate,
    endDate,
    images,
    fundingGoal,
    city
  } = req.body;
  try {
    const createdBy = req.user.id;
    console.log(createdBy);
    let level;
    if(fundingGoal<=10000){
      level='small';
      

    }else if(fundingGoal>=10000&&fundingGoal<=100000){
      level='medium';
      
    }
    else{
       level='large'
     
    }
    const newProject = new Project({
      title,
      description,
      category,
      startDate,
      endDate,
      createdBy,
      images,
      fundingGoal,
      level,
      location:{
        city:city
      }
    });
    const savedProject = await newProject.save();
    const user=await User.findById(createdBy);
    if(fundingGoal<=10000){
      updatePoints(createdBy,100,`Points added for creation of ${savedProject.title}`);
      user.points+=100;
    }else if(fundingGoal>=10000&&fundingGoal<=100000){
      updatePoints(createdBy,500,`Points added for creation of ${savedProject.title}`);
      user.points+=500;
    }
    else{
      updatePoints(createdBy,1000,`Points added for creation of ${savedProject.title}`);
      user.points+=1000;
    }
    await user.save();
    sendMail(user.email,`Project added successfully and you earned the points of ${user.points}`);
    res.json({
      success: true,
      project: savedProject,
      message: "Project created successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      project: projects,
      message: "Projects fetched successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const joinProject=async(req,res)=>{
  console.log("joinProject");
  const {projectId}=req.params;
  try {
    const currUser=await User.findById(req.user.id);
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { members: req.user.id } },
      { new: true }
    );
    sendMail(currUser.email);
    res.json({
      success: true,
      project: updatedProject,
      message: "Project joined successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export const getProject=async (req,res)=>{
  console.log("getProject");
  const {projectId}=req.params;
  try {
    const project = await Project.findById(projectId);
    console.log(project);
    res.json({
      success: true,
      project: project,
      message: "Project fetched successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


export const requestProject=async(req,res)=>{
  console.log("requestProject");
  const {projectId}=req.body;
  console.log(req.body);
  try {
    const currUser=await User.findById(req.user.id);
   
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { requests:req.user.id } },
      { new: true }
    );
    
    sendMail(currUser.email,"Request sent successfully");
    res.json({
      success: true,
      project: updatedProject,
      message: "Request sent successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}