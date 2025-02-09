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
  };

  // Filter emergencies into Pending and Resolved
  const pendingEmergencies = emergencies.filter((emergency) => emergency.status === "pending");
  const resolvedEmergencies = emergencies.filter((emergency) => emergency.status === "resolved");

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Emergency Page</h1>

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
        <br />
        <input
          type="submit"
          value="Submit"
          disabled={isFetchingLocation || formData.latitude === null}
          className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        />
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Pending Emergencies</h2>
        <ul className="mt-4 space-y-4">
          {pendingEmergencies.map((emergency) => (
            <li key={emergency._id} className="p-4 border border-gray-300 rounded-lg">
              <p className="text-lg text-gray-700"><strong>Type:</strong> {emergency.type}</p>
              <p className="text-sm text-gray-500"><strong>Location:</strong> {`Lat: ${emergency.location.coordinates.lat}, Lng: ${emergency.location.coordinates.lng}`}</p>
              <p className="text-sm text-gray-500"><strong>Status:</strong> {emergency.status}</p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Resolved Emergencies</h2>
        <ul className="mt-4 space-y-4">
          {resolvedEmergencies.map((emergency) => (
            <li key={emergency._id} className="p-4 border border-gray-300 rounded-lg">
              <p className="text-lg text-gray-700"><strong>Type:</strong> {emergency.type}</p>
              <p className="text-sm text-gray-500"><strong>Location:</strong> {`Lat: ${emergency.latitude}, Lng: ${emergency.longitude}`}</p>
              <p className="text-sm text-gray-500"><strong>Status:</strong> {emergency.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Emergency;
