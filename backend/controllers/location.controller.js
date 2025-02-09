import Project from "../models/Project.js"; // Import your Project model

export const getLocation = async (req, res) => {
    try {
        const { city, projectId } = req.query; // Expecting city and projectId

        if (!city || !projectId) {
            return res.status(400).json({ error: "City and projectId are required" });
        }

        // Fetch location from OpenStreetMap
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (!data.length) {
            return res.status(404).json({ error: "Location not found" });
        }

        const { lat, lon } = data[0];

        // Update project location in the database
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { $set: { "location.coordinates": { lat: parseFloat(lat), lng: parseFloat(lon) } } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({ message: "Location updated successfully", coordinates: { lat, lon } });
    } catch (error) {
        console.error("Error updating location:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
