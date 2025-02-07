import Project from "../models/Project.js";

//add project
export const addProject = async (req, res) => {
  const {
    title,
    description,
    category,
    status,
    startDate,
    endDate,
    members,
    tasks,
    images,
    fundingGoal,
    donors,
    paymentLink,
  } = req.body;
  try {
    const createdBy = req.user.id;
    console.log(createdBy);
    const newProject = new Project({
      title,
      description,
      category,
      status,
      startDate,
      endDate,
      members,
      createdBy,
      tasks,
      images,
      fundingGoal,
      donors,
      paymentLink,
    });
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//get all projects
export const getAllProjects = async (req, res) => {
  try {
    

    const projects = await Project.find().sort({ createdAt: -1 });
  
    res.json({
      success: true,
      project:projects,
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
