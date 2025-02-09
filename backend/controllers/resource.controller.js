import Resource from "../models/Resource.js";
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


//resouce adding
export const addResource = async (req, res) => {
  const {
    name,
    category,
   
    status,
    price,
    images,
    description,
    
  } = req.body;
  console.log(req.body);
  try {
    const owner = req.user.id;

    const newResource = new Resource({
      name,
      category,
      owner,
      status,
      price,
      images,
      description,

  
    });
    const savedResource = await newResource.save();
    const user=await User.findById(owner);
    let points;
    if(price==0){
      updatePoints(owner,500,`500 Points added for the free Resource provided ${savedResource.name}`);
      points=500;
      user.points+=500;
    }else if(price>0&&price<=5000){
      updatePoints(owner,250,`250 Points added for the  Resource provided ${savedResource.name}`);
      points=250;
      user.points+=250;
    }
    else{
      updatePoints(owner,50,`50 Points added for the  Resource provided ${savedResource.name}`);
      user.points+=50;
      points=50;
    }
    await user.save();
    sendMail(user.email,`Resource added successfully and you earned the points of ${points}`);
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
