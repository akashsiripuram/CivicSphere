import express from "express";
import { reportIssue, getAllIssues, getNearbyIssues, updateIssueStatus } from "../controllers/issue.controller.js";
import verifyToken from "../utils/middleware.js";
const router = express.Router();

router.post("/report",verifyToken, reportIssue);
router.get("/all", getAllIssues);
router.get("/nearby", getNearbyIssues);
router.put("/:id/status",verifyToken, updateIssueStatus);

export default router;
