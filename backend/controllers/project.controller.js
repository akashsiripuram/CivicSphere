import Project from "../models/Project.js";
import sendMail from "../utils/sendEmail.js";
import User from "../models/User.js";


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
  } = req.body;
  try {
    const createdBy = req.user.id;
    console.log(createdBy);
    const newProject = new Project({
      title,
      description,
      category,
      startDate,
      endDate,
      createdBy,
      images,
      fundingGoal,
    });
    const savedProject = await newProject.save();
    const user=await User.findById(createdBy);
    if(fundingGoal<=10000){
      
      user.points+=100;
      

    }else if(fundingGoal>=10000&&fundingGoal<=100000){
      
      user.points+=500;
      
    }
    else{
     
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
