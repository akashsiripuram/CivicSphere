import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    issueType: { 
      type: String, 
      enum: ["Waste Management", "Public Transport", "Air Pollution", "Housing", "Other"], 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    images: { type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.unep.org%2Ftopics%2Fsustainable-development-goals%2Fwhy-do-sustainable-development-goals-matter%2Fgoal-11&psig=AOvVaw2EkoQyv9lC2CnJAxpGfEEw&ust=1745585685064000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDhycbb8IwDFQAAAAAdAAAAABAE"
     }, // Store image URLs
    priority: { 
      type: String, 
      enum: ["Low", "Medium", "High", "Critical"], 
      default: "Medium" 
    },
    status: { 
      type: String, 
      enum: ["Reported", "In Progress", "Resolved"], 
      default: "Reported" 
    },
    resolutionUpdates: [
      {
        updateText: String,
        updatedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

IssueSchema.index({ location: "2dsphere" }); // Enables geospatial queries

const Issues = mongoose.model("Issues", IssueSchema);

export default Issues;
