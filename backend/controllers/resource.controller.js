import Resource from "../models/Resource.js";

//resouce adding
export const addResource = async (req, res) => {
  const {
    name,
    category,
    owner,
    status,
    price,
    images,
    description,
    ratings,
    comments,
  } = req.body;
  try {
    const newResource = new Resource({
      name,
      category,
      owner,
      status,
      price,
      images,
      description,
      ratings,
      comments,
    });
    const savedResource = await newResource.save();
    res.json({
      message: "Resource saved successfully",
      resource: savedResource,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//fetch resources
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json({
      message: "Resources fetched successfully",
      resources,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
