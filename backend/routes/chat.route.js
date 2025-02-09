import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// 📌 Get all messages for a specific project
router.get("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const messages = await Chat.find({ projectId }).populate("sender", "name email");
        
        if (!messages.length) return res.status(404).json({ message: "No messages yet" });

        res.status(200).json(messages);
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 📌 Send a new message
router.post("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const { sender, text } = req.body;

        const newMessage = new Chat({ projectId, sender, text });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("❌ Error posting message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
