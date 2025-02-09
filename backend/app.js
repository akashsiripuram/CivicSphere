import express from "express";
import "dotenv/config"
import projectRouter from "./routes/project.route.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import resourceRouter from "./routes/resource.route.js"
import connectDb from "./utils/connectDb.js";
import issueRouter from "./routes/issue.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import locationRouter from './routes/location.route.js'
import uploadToS3 from "./utils/AWSUpload.js";
const app = express();

const upload = multer({ storage: multer.memoryStorage() });
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization, Cache-Control",
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json());

//connecting to database
connectDb();

app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const fileUrl = await uploadToS3(req.file);

  return res.status(200).json(fileUrl);
});
//Routes
app.use("/api/auth",userRouter);
app.use("/api/project",projectRouter);
app.use("/api/resources",resourceRouter);
app.use("/api/issues",issueRouter);
app.use("/api/payments",paymentRouter);
app.use('/api/location', locationRouter)
//listening on port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port `)
})