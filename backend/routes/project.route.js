import express from "express";
import { getAllProjects,addProject, joinProject } from "../controllers/project.controller.js";
import { verifyToken } from "../utils/middleware.js";
import { Router } from "express";

const app = express();
const router=Router();

router.get("/",getAllProjects);
router.post("/add",verifyToken,addProject);
router.post("/:projectId/join",verifyToken,joinProject);

export default router;