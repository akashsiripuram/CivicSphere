import { useDispatch, useSelector } from "react-redux";
import { 
  Users, 
  Leaf, 
  Award, 
  FolderGit2, 
  UserCheck, 
  AlertCircle, 
  ClipboardList, 
  Camera, 
  MessageSquare, 
  Link2 
} from "lucide-react";
import { useEffect } from "react";
import { fetchProjects } from "../../components/redux/projectSlice";
import { fetchIssues } from "../../components/redux/issueSlice";

function Dashboard() {
  const { isLoading, user } = useSelector((state) => state.auth);
  const { issues } = useSelector((state) => state.issue);
  const { projects } = useSelector((state) => state.project);

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchProjects());
    dispatch(fetchIssues());
  },[])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <div className="animate-pulse text-[#22c55e] text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  const createdProjects = projects.filter(project => project.createdBy === user.id);
  const joinedProjects = projects.filter(project => project.members.includes(user.id));
  const reportedIssues = issues.filter(issue => issue.createdBy === user.id);
  const assignedIssues = issues.filter(issue => issue.assignedTo?.includes(user.id));

  const userPoints = 120;
  const userBadges = ["Community Helper", "Sustainability Advocate"];

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{user?.email}</h1>
              <p className="opacity-80">User ID: {user?.id}</p>
              <div className="flex gap-2 mt-3">
                {userBadges.map((badge, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <Camera className="w-6 h-6 text-teal-500" />
            <span className="text-2xl font-bold text-teal-600 mt-2">{reportedIssues.length}</span>
            <span className="text-sm text-gray-500">Reported Issues</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-teal-500" />
            <span className="text-2xl font-bold text-teal-600 mt-2">{assignedIssues.length}</span>
            <span className="text-sm text-gray-500">Assigned Issues</span>
          </div>
          <div className="flex flex-col items-center">
            <Link2 className="w-6 h-6 text-teal-500" />
            <span className="text-2xl font-bold text-teal-600 mt-2">{userPoints}</span>
            <span className="text-sm text-gray-500">Points</span>
          </div>
        </div>

        {/* Projects & Issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Created Projects ({createdProjects.length})</h3>
            <div className="space-y-4">
              {createdProjects.map(project => (
                <div key={project._id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Reported Issues ({reportedIssues.length})</h3>
            <div className="space-y-4">
              {reportedIssues.map(issue => (
                <div key={issue._id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium">{issue.issueType}</h4>
                  <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;