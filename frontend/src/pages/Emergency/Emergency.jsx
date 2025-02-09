import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addEmergency, getAllEmergencies } from "../../components/redux/emergencySlice";

function Emergency() {
  const { isLoading, emergencies } = useSelector((state) => state.emergency);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: "",
    latitude: null,
    longitude: null,
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    dispatch(getAllEmergencies());
  }, [dispatch]);

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setIsFetchingLocation(false);
          toast.success("Location updated.");
        },
        (error) => {
          setIsFetchingLocation(false);
          toast.error(error.message);
        }
      );
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.latitude === null || formData.longitude === null) {
      toast.error("Please fetch your location.");
      return;
    }

    await dispatch(addEmergency(formData))
      .then((data) => {
        if (!data.payload.success) {
          toast.error(data.payload.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setFormData({ type: "", latitude: null, longitude: null });
    toast.success("Emergency report submitted.");
    dispatch(getAllEmergencies());
    window.location.reload();
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Emergency Page</h1>

      {/* Emergency Reporting Form */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
        <label className="mb-2 text-lg text-gray-700">Type of Emergency:</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
          className="px-4 py-2 mb-4 w-72 border border-gray-300 rounded-lg"
        />
        <button
          type="button"
          onClick={getLocation}
          disabled={isFetchingLocation}
          className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          {isFetchingLocation ? "Fetching Location..." : "Get My Location"}
        </button>
        <input
          type="submit"
          value="Submit"
          disabled={isFetchingLocation || formData.latitude === null}
          className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        />
      </form>

      {/* Loading State */}
      {isLoading && <p className="text-center text-gray-600 mt-4">Loading emergencies...</p>}

      {/* Display Emergency Reports */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reported Emergencies</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {emergencies?.length > 0 ? (
            emergencies.map((emergency) => (
              <div key={emergency._id} className="bg-white shadow-lg rounded-lg p-4 border">
                <h3 className="text-lg font-semibold text-red-600">{emergency.type}</h3>
                <p className="text-sm text-gray-600 mt-1">📍 <b>Location:</b> {emergency.location.city || "Unknown"}</p>
                <p className="text-sm text-gray-600 mt-1">🌍 <b>Coordinates:</b> {emergency.location.coordinates.lat}, {emergency.location.coordinates.lng}</p>
                <p className="text-sm text-gray-600 mt-1">📅 <b>Reported On:</b> {new Date(emergency.createdAt).toLocaleString()}</p>
                <p className={`text-sm font-bold mt-2 py-1 px-3 rounded-full inline-block ${emergency.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                  {emergency.status.toUpperCase()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No emergencies reported yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Emergency;
