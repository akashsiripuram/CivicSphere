import express from "express";
import "dotenv/config";
import projectRouter from "./routes/project.route.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import resourceRouter from "./routes/resource.route.js";
import connectDb from "./utils/connectDb.js";
import issueRouter from "./routes/issue.route.js";
import geminiRouter from "./routes/gemini.route.js";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import multer from "multer";
import locationRouter from "./routes/location.route.js";
import uploadToS3 from "./utils/AWSUpload.js";
import chatSocket from "./sockets/chatSocket.js";
import { Server } from "socket.io";
import session from "express-session";

import emergencyRouter from "./routes/emergency.route.js";
const app = express();
const server = http.createServer(app);

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://civic-sphere.vercel.app",
];

// app.use(cors({
//   origin: "*",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.use(cors({ origin: allowedOrigins,allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // Set `secure: true` only in production
  })
);

const upload = multer({ storage: multer.memoryStorage() });

const io = new Server(server);
// , {
//   cors: {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// }

// Connect to Database
connectDb();

// Initialize Chat Socket
chatSocket(io);
app.get("/", (req, res) => {
  res.json({
    message: "Server is alive",
  });
});
// File Upload Route
app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = await uploadToS3(req.file);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

// Routes
app.use("/api/auth", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/resources", resourceRouter);
app.use("/api/issues", issueRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/location", locationRouter);
app.use("/api/gemini/",geminiRouter);
import chatRouter from "./routes/chat.route.js"; // ✅ Import chat routes
app.use("/api/chat", chatRouter);
// import emergencyRouter from "./routes/emergency.route.js";
app.use("/api/emergency", emergencyRouter);
// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
