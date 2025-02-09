import express from "express";
import{ createOrder, getPaymentDetails } from "../controllers/payment.controller.js"

const router = express.Router();

router.post("/", createOrder);
router.get("/payment/:paymentId", getPaymentDetails);

export default router;
