import express from "express";
import { reportIssue, getAllIssues, getNearbyIssues, updateIssueStatus } from "../controllers/issue.controller.js";

const router = express.Router();

router.post("/report", reportIssue);
router.get("/all", getAllIssues);
router.get("/nearby", getNearbyIssues);
router.put("/:id/status", updateIssueStatus);

export default router;
