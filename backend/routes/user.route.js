import express from "express";
import { Router } from "express";
import { login, logoutUser, register } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/middleware.js";

const app = express();
const router=Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", logoutUser);
router.get("/check-auth",verifyToken,(req,res,next)=>{
    const user=req.user;
    res.json({
        success:true,
        message:"Authenticated",
        user
    })
})

export default router;
