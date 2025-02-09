import express from "express";
import {verifyToken} from "../utils/middleware.js";
import { addEmergency, getAllEmergencies } from "../controllers/emergency.controller.js";
const router = express.Router();

router.get("/",getAllEmergencies);
router.post("/add",verifyToken,addEmergency);

export default router;
