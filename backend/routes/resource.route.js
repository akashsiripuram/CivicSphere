import express, { Router } from 'express';
import { addResource, getResources } from '../controllers/resource.controller.js';
import { verifyToken } from '../utils/middleware.js';
const app = express();
const router=Router();

router.get("/",getResources);
router.post("/add",verifyToken,addResource);

export default router;  
