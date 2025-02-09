import { getProject } from "../../components/redux/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getUser } from "../../components/redux/authSlice";

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default India center

function ProjectDetail() {
    const { id: projectId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { project, isLoading } = useSelector((state) => state.project);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProject(projectId));
        dispatch(getUser(user.id));
        dispatch(getProject(projectId));
    }, [dispatch, projectId]);
    useEffect(() => {
        // Kommunicate Chatbot Integration
        (function (d, m) {
            var kommunicateSettings = {
                "appId": "d560ccd17d1c66d340768072a8a76192", // Your Kommunicate App ID
                "botIds": ["mybot-8c1bc"],
                "assignee": "mybot-8c1bc",
                "popupWidget": true, // Open chatbot as a popup
                "automaticChatOpenOnNavigation": true
            };

            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []); // Runs only once when the component mounts

    console.log(user);
    console.log(project);
    if (isLoading) return <h1 className="text-center text-2xl font-bold text-gray-700">Loading...</h1>;

    // Ensure coordinates are numbers to avoid errors
    const latitude = parseFloat(project?.location?.coordinates?.lat || defaultCenter.lat);
    const longitude = parseFloat(project?.location?.coordinates?.lng || defaultCenter.lng);

    return (
        project && (
            <div className="flex h-screen p-6 bg-gray-100 gap-6 ">
                {/* Left Side: Project Details */}
                <div className="w-2/3 bg-white p-6 shadow-md rounded-lg flex flex-col">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h2>
                    <p className="text-lg text-gray-700 italic border-l-4 border-emerald-500 pl-4">{project.description}</p>

                    {/* Image */}
                    {project.images?.length > 0 ? (
                        <img
                            src={project.images[0]}
                            alt="Project"
                            className="mt-6 w-full h-48 object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 mt-6">No images available</p>
                    )}

                    {
                        user && user.role === "gov_official" && project && project.level === "large" && (
                            <div>
                                <button className="bg-green-400 p-3">Request to Assigin</button>
                            </div>
                        )
                    }

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
                        <h3 className="text-2xl font-bold mt-10 mb-4 ">Project Location</h3>
                        <Map
                            initialViewState={{
                                longitude,
                                latitude,
                                zoom: 12,
                            }}
                            style={{ width: "100%", height: "350px" }}
                            mapboxAccessToken="pk.eyJ1Ijoic2lyaWRldm9qdSIsImEiOiJjbHloZGdqYjIwMzVjMmtzYXowNjNzajRtIn0.5_fULxohRjzyjl9cKOL_mQ"
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                            <Marker longitude={longitude} latitude={latitude} color="red" />
                        </Map>
                    </div >
                </div >

                {/* Right Side: Chat Section */}
                < div className="w-1/3 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col rounded-lg shadow-lg" >
                    <h2 className="text-2xl font-bold mb-4">Chat</h2>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 rounded-lg text-gray-800"
                        />
                    </div>
                </div >
            </div >
        )
    );
}

export default ProjectDetail;
