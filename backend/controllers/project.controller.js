import Project from "../models/Project.js";

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
