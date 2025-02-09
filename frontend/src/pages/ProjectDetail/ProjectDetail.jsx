import { getProject } from "../../components/redux/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getUser } from "../../components/redux/authSlice";

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default India center

function ProjectDetail() {
    const { id: projectId } = useParams();
    const {  user } = useSelector((state) => state.auth);
    const { project, isLoading } = useSelector((state) => state.project);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(user.id));
        dispatch(getProject(projectId));
    }, [dispatch, projectId]);
console.log(user);
console.log(project);
    if (isLoading) return <h1 className="text-center text-2xl font-bold text-gray-700">Loading...</h1>;

    // Ensure coordinates are numbers to avoid errors
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

                    {/* Image */}
                    {project.images?.length > 0 ? (
                        <img
                            src={project.images[0]}
                            alt="Project"
                            className="mt-6 w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 mt-6">No images available</p>
                    )}

                    {
                        user&&user.role==="gov_official"&&project&&project.level==="large"&&(
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
                        <h3 className="text-2xl font-bold mb-4">Project Location</h3>
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
                    </div>
                </div>

                {/* Right Side: Chat Section */}
                <div className="w-1/3 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Chat</h2>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 rounded-lg text-gray-800"
                        />
                    </div>
                </div>
            </div>
        )
    );
}

export default ProjectDetail;
