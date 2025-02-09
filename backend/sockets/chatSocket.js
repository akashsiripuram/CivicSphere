const chatSocket = (io) => {
    io.on("connection", (socket) => {
      console.log("✅ User connected:", socket.id);
  
      socket.on("joinProject", (projectId) => {
        socket.join(projectId);
        console.log(`🔗 User joined project chat: ${projectId}`);
      });
  
      socket.on("sendMessage", async ({ projectId, sender_name, sender, text }) => {
        console.log(`📨 Message from ${sender}: ${text}`); // ✅ Debugging
        console.log(sender);
        const message = { projectId,sender_name, sender, text, timestamp: new Date() };
  
        try {
          const ChatMessage = (await import("../models/Chat.js")).default;
          const newMessage = new ChatMessage(message);
          await newMessage.save();
          console.log("✅ Message saved to DB:", newMessage); // ✅ Debugging
  
          io.to(projectId).emit("newMessage", message);
        } catch (error) {
          console.error("❌ Error saving message:", error);
        }
      });
  
      socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
      });
    });
  };
  
  export default chatSocket;
  