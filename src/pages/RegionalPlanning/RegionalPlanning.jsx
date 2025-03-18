import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import ReactMarkdown from "react-markdown";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GEMINI_API_KEY = "AIzaSyCvAH1aUauuWbGf3kp_7ElaHRqvQPH5KmU"; // Replace with actual API Key
const GEO_API_KEY = "a7060db4c17739ddbe9cd0778ebb0260"; // Use OpenWeather or another API

function RegionalPlanning() {
  const [location, setLocation] = useState(null);
  const [manualInput, setManualInput] = useState(""); // User's manual input
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Fetch user's city and population via geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GEO_API_KEY}`);
          const city = response.data.name;
          const population = Math.floor(Math.random() * 1000000) + 500000; // Mock population data

          setLocation({ city, lat, lon, population });
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  // Generate AI-Based Urban Growth Report
  const generateReport = async () => {
    if (!location && !manualInput) return;

    setLoading(true);
    setReport(null);
    setChartData(null);

    const city = manualInput || location.city;

    const prompt = `
      Predict the urban growth of the following city based on:
      - Population: ${location?.population || "unknown"}
      - Infrastructure: Budget allocation, transport, sustainability projects
      - Environmental sustainability efforts
      - Citizen engagement in development

      City: ${city}
      Provide key insights in a structured format.
    `;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      setReport(aiResponse);

      // Process data for visualization
      setChartData({
        labels: ["Population", "Infrastructure Budget", "Public Transport", "Green Spaces"],
        datasets: [
          {
            label: "City Development Index",
            data: [location?.population / 10000 || 50, 75, 60, 80], // Mock data
            backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
          },
        ],
      });
    } catch (error) {
      console.error("Error generating AI report:", error);
      setReport("Error generating prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <motion.h1
        className="text-4xl font-bold text-center text-emerald-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏙️ Regional Development Planning
      </motion.h1>

      {/* City Info Card */}
      <Card className="max-w-3xl mx-auto shadow-md mb-6 bg-white border border-gray-200">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold text-emerald-700">📍 Enter Location</h2>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg font-medium text-gray-800">Current Location: {location?.city || "Not available"}</p>
          <p className="text-gray-600 text-sm">Detected from your geolocation or manually entered below.</p>

          {/* User Input */}
          <div className="mt-4">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter city, state, or country"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Section */}
      <Card className="max-w-3xl mx-auto shadow-md bg-white border border-gray-200">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold text-emerald-700">📊 AI-Based Urban Growth Prediction</h2>
        </CardHeader>
        <CardContent>
          <Button onClick={generateReport} disabled={loading || (!location && !manualInput)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            {loading ? "Analyzing..." : "Generate AI Report"}
          </Button>

          {/* AI Response */}
          {report && (
            <Alert className="mt-4 bg-emerald-50 border-emerald-400">
              <AlertTitle className="text-emerald-800">AI Prediction</AlertTitle>
              <AlertDescription className="text-gray-700">
                <ReactMarkdown>{report}</ReactMarkdown>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Chart.js Visualization */}
      {chartData && (
        <Card className="max-w-3xl mx-auto shadow-md mt-6 bg-white border border-gray-200">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold text-green-700">📈 Urban Development Stats</h2>
          </CardHeader>
          <CardContent>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default RegionalPlanning;
