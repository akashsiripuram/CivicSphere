import express from "express";
import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";

const app = express();
const router=Router();

router.post("/register",register);
router.post("/login",login);

export default router;
