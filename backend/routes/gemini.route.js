import express from "express";
import { run } from "../controllers/gemini.controller.js";

const router = express.Router();

router.post("/prompt", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await run(prompt);
    return res.json({ reply: response });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
