import mongoose from "mongoose";

const EmergencySchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    
  },
  location: {
    city: { type: String },
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
  },
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "resolved"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Emergency = mongoose.model("Emergency", EmergencySchema);

export default Emergency;
