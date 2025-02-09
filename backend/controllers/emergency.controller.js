import Emergency from "../models/Emergency.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";

export const addEmergency = async (req, res) => {
  const { type, latitude, longitude, status, city } = req.body;
  try {
    console.log("Request Body:", req.body);

    const reportedBy = req.user?.id;
    if (!reportedBy) {
      return res.status(400).json({ success: false, message: "User not authenticated" });
    }

    const newEmergency = new Emergency({
      type,
      location: {
        city: city || "Unknown", // Default value to avoid schema errors
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
      },
      reportedBy,
      status,
    });

    console.log("New Emergency Before Save:", newEmergency);

    await newEmergency.save();

    return res.status(201).json({
      success: true,
      message: "Emergency reported successfully!",
      emergency: newEmergency,
    });
  } catch (err) {
    console.error("Error saving emergency:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    return res
      .status(200)
      .json({ success: true, emergencies, message: "Fetched emergencies" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch emergencies" });
  }
};
