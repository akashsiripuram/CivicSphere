import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  fetchProjects,
  joinProject,
} from "../../components/redux/projectSlice";
import {
  CalendarDays,
  Users,
  Target,
  Timer,
  Search,
  Droplets,
  TreePine,
  Wind,
  Recycle,
  Plus,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { data, Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const projectImages = {
  water:
    "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  solar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  forest:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  waste:
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
};

const categoryIcons = {
  water: Droplets,
  solar: Wind,
  forest: TreePine,
  waste: Recycle,
};

function CreateProjectModal() {
  const [imgUrl,setImgUrl]=useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    fundingGoal: "",
    startDate: "",
    endDate: "",
    images: "",
    city:""
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({...formData,images:imgUrl});
    console.log(formData);
    // console.log(imgUrl);
    dispatch(addProject(formData)).then(() => {
      toast.success("Project added successfully");
    });
    window.location.reload();
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    console.log("Cominy");
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const uploadedUrl = response.data; // Assuming the API returns the URL directly in response.data
     setFormData({...formData,images:uploadedUrl});
      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("File upload failed!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800">
            Create New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <Input
              id="image"
              value={formData.image}
              // onChange={(e) =>
              //   setFormData({ ...formData, title: e.target.value })
              // }
              onChange={handleFileUpload}
              type="file"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">education</SelectItem>
                <SelectItem value="healthcare">healthcare</SelectItem>
                <SelectItem value="environment">environment</SelectItem>
                <SelectItem value="politics">politics</SelectItem>
                <SelectItem value="cleanliness">cleanliness</SelectItem>
                <SelectItem value="transport">transport</SelectItem>
                <SelectItem value="energy">energy</SelectItem>
                <SelectItem value="disaster relief">disaster relief</SelectItem>
                <SelectItem value="other">other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
            <Input
              id="fundingGoal"
              type="number"
              value={formData.fundingGoal}
              onChange={(e) =>
                setFormData({ ...formData, fundingGoal: e.target.value })
              }
              placeholder="Enter funding goal"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundingGoal">City</Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData,city: e.target.value })
              }
              placeholder="Enter City"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white">
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Project() {
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector((state) => state.project);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleJoin = (projectId,project) => {
    
    if (!user || project.members.includes(user.id)) {
      toast.info("You have already joined this project");
      return;
    }

    dispatch(joinProject(projectId))
      .then(() => toast.success("Joined project"))
      .catch(() => toast.error("Failed to join project"));
  };


  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
 

  // Mock additional projects for demonstration
  const allProjects = projects;

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getProgressColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-yellow-500";
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
          <div className="flex w-full md:w-auto gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <CreateProjectModal />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {["all", "water", "solar", "forest", "waste"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === category
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 hover:bg-green-100"
                  }`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={project.images[0] || projectImages.water}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  
                />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center gap-2">
                    {categoryIcons[project.category] &&
                      React.createElement(categoryIcons[project.category], {
                        size: 16,
                      })}
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  <Link to={`/project/${project._id}`}>{project.title}</Link>
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
                    <span>
                      {new Date(project.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Timer className="w-4 h-4 text-orange-500" />
                    <span>
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
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
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${getProgressColor(
                        project.status
                      )}`}></div>
                  </div>
                </div>
                <div className="flex flex-row justify-between space-x-3">
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    onClick={() => handleJoin(project._id, project)}>
                    {(project.members&&project.members.find((member) => member === user.id) )? "Joined" : "Join Project"}

                    <Target className="w-4 h-4" />
                  </button>

                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    Support Project
                    <Target className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <TreePine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
