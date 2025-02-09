import { getProject } from "../../components/redux/projectSlice";
import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getUser } from "../../components/redux/authSlice";
import io from "socket.io-client";

const socket = io("http://localhost:8000");
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default India center

function ProjectDetail() {
    const { id: projectId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { project, isLoading } = useSelector((state) => state.project);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        dispatch(getUser(user.id));
        dispatch(getProject(projectId));
    
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/chat/${projectId}`);
                const data = await response.json();
                console.log("✅ Parsed JSON:", data);
                setMessages(Array.isArray(data) ? data : []);  // Ensure messages is always an array
            } catch (error) {
                console.error("❌ Error fetching messages:", error);
                setMessages([]);  // Prevents null issues
            }
        };
    
        fetchMessages();
    
        socket.emit("joinProject", projectId);
        socket.on("newMessage", (message) => {
            console.log("📩 Received new message:", message);
            setMessages((prevMessages = []) => [...prevMessages, message]); // Ensure prevMessages is always an array
        });
    
        return () => {
            socket.off("newMessage");
        };
    }, [dispatch, projectId]);
    
    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit("sendMessage", { projectId, sender_name: user.name, sender: user._id, text: newMessage });
            setNewMessage("");
        }
    };

    if (isLoading) return <h1 className="text-center text-2xl font-bold text-gray-700">Loading...</h1>;

    const latitude = parseFloat(project?.location?.coordinates?.lat || defaultCenter.lat);
    const longitude = parseFloat(project?.location?.coordinates?.lng || defaultCenter.lng);

    return (
        project && (
            <div className="flex h-screen p-6 bg-gray-100">
                {/* Left Side: Project Details */}
                <div className="w-2/3 bg-white p-6 shadow-md rounded-lg flex flex-col">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 flex justify-between items-center">
                        {project.title}
                        <button className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
                            <Link to={`/donations`}>Contribute</Link>
                        </button>
                    </h2>
                    <p className="text-lg text-gray-700 italic border-l-4 border-emerald-500 pl-4">{project.description}</p>

                    {project.images?.length > 0 ? (
                        <img
                            src={project.images[0]}
                            alt="Project"
                            className="mt-6 w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 mt-6">No images available</p>
                    )}

                    {user && user.role === "gov_official" && project && project.level === "large" && (
                        <div>
                            <button className="bg-green-400 p-3">Request to Assign</button>
                        </div>
                    )}

                    {/* Information Grid */}
                    <div className="grid grid-cols-2 gap-6 mt-6 text-lg">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <span className="block text-gray-500 text-sm">Funding Goal</span>
                            <span className="font-semibold">{project.fundingGoal} USD</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <span className="block text-gray-500 text-sm">Members</span>
                            <span className="font-semibold">{project.members?.length || "N/A"}</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <span className="block text-gray-500 text-sm">Start Date</span>
                            <span className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <span className="block text-gray-500 text-sm">End Date</span>
                            <span className="font-semibold">{new Date(project.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow text-center">
                            <span className="block text-gray-500 text-sm">Category</span>
                            <span className="font-semibold capitalize">{project.category}</span>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold mb-4">Project Location</h3>
                        <Map
                            initialViewState={{
                                longitude,
                                latitude,
                                zoom: 12,
                            }}
                            style={{ width: "100%", height: "350px" }}
                            mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                            <Marker longitude={longitude} latitude={latitude} color="red" />
                        </Map>
                    </div>
                </div>

                {/* Right Side: Chat Section */}
                <div className="w-1/3 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Chat</h2>
                    <div className="h-64 overflow-y-auto bg-white text-black p-2 rounded-md shadow-inner">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className="mb-2 p-2 border-b border-gray-300">
                                    <strong>{msg.sender_name || "Unknown"}:</strong> {msg.text}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No messages yet</p>
                        )}
                    </div>

                    <div className="mt-4 flex">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full p-2 rounded-lg text-gray-800"
                        />
                        <button
                            className="ml-2 bg-green-500 px-4 py-2 rounded-lg"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default ProjectDetail;
