import express from "express";
import { getLocation } from "../controllers/location.controller.js";
const router = express.Router();

router.get("/", getLocation);

export default router;
