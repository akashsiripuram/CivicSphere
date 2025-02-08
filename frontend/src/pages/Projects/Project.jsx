import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../components/redux/projectSlice";
import { CalendarDays, Users, Target, Timer, Search,  Droplets, TreePine, Wind, Recycle } from "lucide-react";

const projectImages = {
  water: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  waste: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
};

const categoryIcons = {
  water: Droplets,
  solar: Wind,
  forest: TreePine,
  waste: Recycle
};

function Project() {
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector((state) => state.project);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // Mock additional projects for demonstration
  const allProjects = projects ? [
    ...projects,
    {
      _id: "2",
      title: "Solar Power Initiative",
      description: "Bringing renewable solar energy to urban communities.",
      category: "solar",
      fundingGoal: 75000,
      members: ["1", "2", "3"],
      startDate: "2025-03-01T00:00:00.000Z",
      endDate: "2025-08-01T00:00:00.000Z",
      status: "active"
    },
    {
      _id: "3",
      title: "Urban Forest Project",
      description: "Creating green spaces in city centers to improve air quality.",
      category: "forest",
      fundingGoal: 30000,
      members: ["1", "2"],
      startDate: "2025-04-01T00:00:00.000Z",
      endDate: "2025-07-01T00:00:00.000Z",
      status: "active"
    },
    {
      _id: "4",
      title: "Zero Waste Program",
      description: "Implementing comprehensive recycling and waste reduction systems.",
      category: "waste",
      fundingGoal: 45000,
      members: ["1", "2", "3", "4"],
      startDate: "2025-05-01T00:00:00.000Z",
      endDate: "2025-09-01T00:00:00.000Z",
      status: "active"
    }
  ] : [];

  const filteredProjects = allProjects.filter(project => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getProgressColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      default: return "bg-yellow-500";
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <TreePine className="h-8 w-8 text-green-500 animate-pulse" />
          </div>
          <p className="mt-4 text-green-800 font-medium animate-pulse">
            Loading sustainable projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
          Sustainable Cities & Communities Projects
        </h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {["all", "water", "solar", "forest", "waste"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 hover:bg-green-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div 
              key={project._id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={projectImages[project.category] || projectImages.water}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center gap-2">
                    {categoryIcons[project.category] && React.createElement(categoryIcons[project.category], { size: 16 })}
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {project.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Target className="w-4 h-4 text-green-500" />
                    <span>${project.fundingGoal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{project.members.length} Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays className="w-4 h-4 text-purple-500" />
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Timer className="w-4 h-4 text-orange-500" />
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                    <div
                      style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${getProgressColor(project.status)}`}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  Support Project
                  <Target className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <TreePine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;