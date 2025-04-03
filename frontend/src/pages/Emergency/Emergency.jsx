import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { addEmergency, getAllEmergencies } from "../../components/redux/emergencySlice";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";

const GEMINI_API_KEY = "AIzaSyCvAH1aUauuWbGf3kp_7ElaHRqvQPH5KmU"; // Replace with actual API Key
const WEATHER_API_KEY = "a7060db4c17739ddbe9cd0778ebb0260"; // Replace with OpenWeather API Key

function Emergency() {
  const { isLoading, emergencies } = useSelector((state) => state.emergency);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: "",
    latitude: null,
    longitude: null,
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [aiPrediction, setAiPrediction] = useState({
    text: "Checking for upcoming emergencies...",
    riskLevel: "Unknown",
    isUnsafe: false,
  });

  useEffect(() => {
    dispatch(getAllEmergencies());
    checkForDisaster(); // AI checks for upcoming emergencies on page load
  }, [dispatch]);

  // 📌 Fetch user's location
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

  // 📌 Fetch real-time weather & earthquake data
  const getDisasterData = async () => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${formData.latitude || 17.3850}&lon=${formData.longitude || 78.4867}&appid=${WEATHER_API_KEY}`
      );
      const weather = weatherRes.data;

      // Mock earthquake API response (Replace with real API)
      const earthquakeData = { magnitude: 5.2, location: "Nearby Region" };

      return {
        temperature: weather.main.temp - 273.15, // Convert Kelvin to Celsius
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        earthquakeMagnitude: earthquakeData.magnitude,
      };
    } catch (error) {
      console.error("Error fetching disaster data:", error);
      return null;
    }
  };

  // 📌 Send data to Gemini AI for emergency prediction
  const checkForDisaster = async () => {
    setAiPrediction({
      text: "Checking for upcoming emergencies...",
      riskLevel: "Unknown",
      isUnsafe: false,
    });

    const disasterData = await getDisasterData();
    if (!disasterData) {
      setAiPrediction({ text: "Could not fetch real-time data.", riskLevel: "Unknown", isUnsafe: false });
      return;
    }

    const prompt = `
      Based on the following real-time data, predict the risk of a disaster:

      - Temperature: ${disasterData.temperature.toFixed(1)}°C
      - Humidity: ${disasterData.humidity}%
      - Wind Speed: ${disasterData.windSpeed} km/h
      - Earthquake Magnitude: ${disasterData.earthquakeMagnitude}

      Provide a risk level (low, medium, high, critical) and a short explanation.
    `;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiResponseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
      console.log("AI Prediction:", aiResponseText);

      // Extract risk level
      let riskLevel = "Unknown";
      if (aiResponseText.toLowerCase().includes("low")) riskLevel = "Low";
      else if (aiResponseText.toLowerCase().includes("medium")) riskLevel = "Medium";
      else if (aiResponseText.toLowerCase().includes("high")) riskLevel = "High";
      else if (aiResponseText.toLowerCase().includes("critical")) riskLevel = "Critical";

      // Determine safe or unsafe status
      const isUnsafe = riskLevel === "High" || riskLevel === "Critical";
      setAiPrediction({ text: aiResponseText, riskLevel, isUnsafe });

      // Auto-report if unsafe
      if (isUnsafe) {
        autoReportEmergency(aiResponseText);
      }
    } catch (error) {
      console.error("Error getting prediction from Gemini:", error.response?.data || error.message);
      setAiPrediction({ text: "Error fetching AI prediction.", riskLevel: "Unknown", isUnsafe: false });
    }
  };

  // 📌 Auto-report emergency if Gemini detects risk
  const autoReportEmergency = async (aiPredictionText) => {
    const emergencyData = {
      type: aiPredictionText.includes("earthquake") ? "Earthquake" : "Severe Weather",
      latitude: formData.latitude || 17.3850,
      longitude: formData.longitude || 78.4867,
    };

    await dispatch(addEmergency(emergencyData))
      .then(() => {
        toast.success("🚨 AI detected a disaster! Auto-reported.");
        dispatch(getAllEmergencies());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.latitude === null || formData.longitude === null) {
      toast.error("Please fetch your location.");
      return;
    }
    console.log(formData);

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
    window.location.reload();
  };
  const riskColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
    Critical: "bg-red-500 text-white",
    Unknown: "bg-gray-100 text-gray-700",
  };


  return (
    <div className="p-6 font-sans">
      

      {/* AI Prediction Display */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      AI-Powered Emergency Prediction
    </h1>

    {/* AI Prediction Card */}
    <Card className="max-w-5xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <h2 className={`text-2xl font-semibold ${aiPrediction.isUnsafe ? "text-red-700" : "text-green-700"}`}>
          {aiPrediction.isUnsafe ? "🚨 High-Risk Emergency Detected" : "✅ No Immediate Threat"}
        </h2>
        <Badge className={`mt-2 px-4 py-1 rounded-full text-lg ${riskColors[aiPrediction.riskLevel]}`}>
          {aiPrediction.riskLevel} Risk Level
        </Badge>
      </CardHeader>

      <CardContent>
        <Alert className={`mb-4 ${aiPrediction.isUnsafe ? "bg-red-50 border-red-400" : "bg-green-50 border-green-400"}`}>
          <AlertTitle>{aiPrediction.isUnsafe ? "Stay Alert!" : "You're Safe"}</AlertTitle>
          <AlertDescription>{aiPrediction.text}</AlertDescription>
        </Alert>

        {/* Format AI Explanation with Bullet Points */}
        <div className="space-y-2 text-gray-700 text-lg">
          {aiPrediction.text
            .split("*")
            .filter((line) => line.trim() !== "")
            .map((line, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-600">•</span>
                <p>{line.trim()}</p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
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
          disabled={isFetchingLocation || !formData.latitude}
          className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        />
      </form>


      {/* Display Emergency Reports */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reported Emergencies</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {emergencies?.length > 0 ? (
            emergencies.map((emergency) => (
              <div key={emergency._id} className="bg-white shadow-lg rounded-lg p-4 border">
                <h3 className="text-lg font-semibold text-red-600">{emergency.type}</h3>
                <p className="text-sm text-gray-600 mt-1">📍 Location: {emergency.location.city || "Unknown"}</p>
                <p className="text-sm text-gray-600 mt-1">📅 Reported On: {new Date(emergency.createdAt).toLocaleString()}</p>
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
