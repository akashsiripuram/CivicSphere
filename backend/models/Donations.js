import mongoose from "mongoose";

const DonationSchema = mongoose.Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
});

const Donations=mongoose.model("Donations",DonationSchema);

export default Donations;
