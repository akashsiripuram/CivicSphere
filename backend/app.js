import express from "express";
import "dotenv/config"
import projectRouter from "./routes/project.route.js";
import userRouter from "./routes/user.route.js";
import resourceRouter from "./routes/resource.route.js"
import connectDb from "./utils/connectDb.js";
import issueRouter from "./routes/issue.route.js";
const app = express();

app.use(express.json());

//connecting to database
connectDb();

//Routes
app.use("/api/auth",userRouter);
app.use("/api/project",projectRouter);
app.use("/api/resources",resourceRouter);
app.use("api/issues",issueRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port `)
})