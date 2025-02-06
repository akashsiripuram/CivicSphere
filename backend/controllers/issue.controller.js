import Issues from "../models/Issue.js";

export const reportIssue = async (req, res) => {
    console.log("report");
  try {
    const { createdBy, issueType, description, location, images, priority } = req.body;
    const newIssue = new Issues({ createdBy, issueType, description, location, images, priority });
    await newIssue.save();
    res.status(201).json({ message: "Issue reported successfully!", issue: newIssue });
  } catch (error) {
    res.status(500).json({ error: "Failed to report issue", details: error.message });
  }
};

export const getAllIssues = async (req, res) => {
    try {
      const issues = await Issues.find();
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issues", details: error.message });
    }
};
  

export const getNearbyIssues = async (req, res) => {
  try {
    const { longitude, latitude, radius } = req.query;
    if (!longitude || !latitude || !radius) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }
    const issues = await Issues.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: parseInt(radius),
        },
      },
    });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nearby issues", details: error.message });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedIssue = await Issues.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedIssue) return res.status(404).json({ error: "Issue not found" });
    res.status(200).json({ message: "Issue status updated successfully", issue: updatedIssue });
  } catch (error) {
    res.status(500).json({ error: "Failed to update issue status", details: error.message });
  }
};
