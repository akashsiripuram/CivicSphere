import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import emailExistence from "email-existence"
import projectRouter from "./routes/project.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.post("/api/exist",(req,res)=>{
    emailExistence.check(`${req.body.email}`, function(error, response){
       return res.json(response);
    });
})
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/civicSphere")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection failed:", err));

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.use("/api/auth",userRouter);
app.use("/api/project",projectRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port `)
})
