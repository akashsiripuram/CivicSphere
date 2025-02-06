import mongoose from "mongoose";

export default function connectDb(){
    mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/civicSphere")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection failed:", err));
}