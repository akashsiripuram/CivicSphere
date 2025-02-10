import express from "express";
import { getAllProjects,addProject, joinProject, getProject, requestProject, assignProject } from "../controllers/project.controller.js";
import { verifyToken } from "../utils/middleware.js";
import { Router } from "express";

const app = express();
const router=Router();

router.get("/",getAllProjects);
router.get("/:projectId",getProject);
router.post("/add",verifyToken,addProject);
router.post("/:projectId/join",verifyToken,joinProject);
router.post("/request",verifyToken,requestProject)
router.post("/:id/assign",verifyToken,assignProject);

export default router;