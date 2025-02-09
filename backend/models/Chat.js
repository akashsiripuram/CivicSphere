import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender_name: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
