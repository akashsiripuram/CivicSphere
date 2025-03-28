import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const chatEndRef = useRef(null);
 
   // Auto-scroll to the latest message
   useEffect(() => {
     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);
 
   const sendMessage = async () => {
     if (input.trim() === "") return;
 
     const userMessage = { text: input, sender: "user" };
     setMessages((prev) => [...prev, userMessage]);
     setInput("");
     setIsLoading(true);
 
     try {
       const response = await axios.post("http://localhost:8000/api/gemini/prompt", { prompt: input });
       setMessages((prev) => [...prev, { text: response.data.reply, sender: "bot" }]);
       console.log("Response:", response.data.reply);
     } catch (error) {
       console.error("Error fetching response:", error);
       setMessages((prev) => [...prev, { text: " Sorry, an error occurred.", sender: "bot" }]);
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
       {isOpen && (
         <div className="bg-white w-80 h-95 shadow-lg rounded-xl p-4 border border-gray-300 flex flex-col">
           <div className="flex justify-between items-center">
             <h2 className="text-lg font-semibold">Chat Buddy</h2>
             <button onClick={() => setIsOpen(false)} className="text-gray-600">
               <X size={30} />
             </button>
           </div>
 
           {/* Chat Messages */}
           <div className="mt-4 h-64 overflow-y-auto border p-2 rounded-lg bg-gray-100 flex flex-col">
             {messages.map((msg, index) => (
               <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                 <p className={`text-sm p-2 rounded-lg mb-2 max-w-[75%] ${msg.sender === "user" ? "bg-gray-300 text-black" : "bg-gray-300 text-emerald-700"}`}>
                   {msg.text}
                 </p>
               </div>
             ))}
             {isLoading && (
               <div className="flex justify-start">
                 <p className="text-sm p-2 rounded-lg mb-2 max-w-[75%] bg-gray-300 text-emerald-700 animate-pulse">
                   Typing...
                 </p>
               </div>
             )}
             <div ref={chatEndRef} />
           </div>
 
           {/* Input Field */}
           <div className="flex mt-2 border-t pt-2">
             <input
               type="text"
               className="flex-1 border rounded-lg p-2 text-sm focus:outline-none"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
               placeholder="Type a message..."
             />
             <button 
               onClick={sendMessage} 
               className="ml-2 bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-600 transition"
             >
               <Send size={20} />
             </button>
           </div>
         </div>
       )}
       
       {/* Floating Chat Button */}
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition"
       >
         <MessageCircle size={32} />
       </button>
     </div>
   );
 }
 
