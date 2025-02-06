import express from "express";
import { getAllProjects,addProject } from "../controllers/project.controller.js";
import { verifyToken } from "../utils/middleware.js";
import { Router } from "express";

const app = express();
const router=Router();

router.get("/get",getAllProjects);
router.post("/add",verifyToken,addProject);

export default router;