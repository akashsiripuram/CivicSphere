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
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchProjects } from "../../components/redux/projectSlice";
import { fetchIssues } from "../../components/redux/issueSlice";
import { getUser } from "../../components/redux/authSlice";

function Dashboard() {
  const { isLoading, user } = useSelector((state) => state.auth);
  const { issues } = useSelector((state) => state.issue);
  const { projects } = useSelector((state) => state.project);
  const [chartData, setChartData] = useState([]);


  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUser(user.id));
    dispatch(fetchProjects());
    dispatch(fetchIssues());
  },[])
  useEffect(() => {
    if (user?.logs) {
      const formattedData = user.logs.map((log) => [new Date(log.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
        , log.pointsAdded]);
      setChartData([["Date", "Points"], ...formattedData]);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <div className="animate-pulse text-[#22c55e] text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }
  console.log(user);

  const createdProjects = projects.filter(project => project.createdBy === user._id);
  const joinedProjects = projects.filter(project => project.members.includes(user._id));
  const reportedIssues = issues.filter(issue => issue.createdBy === user._id);
  const assignedIssues = issues.filter(issue => issue.assignedTo?.includes(user._id));

  const userPoints = 120;
  const userBadges = ["Community Helper", "Sustainability Advocate"];
  console.log(user);
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
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="opacity-80">Email: {user?.email}</p>
              <p className="opacity-80">Role: {user?.role}</p>
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
            <span className="text-2xl font-bold text-teal-600 mt-2">{user.points}</span>
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
        <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">User Points Over Time</h3>
          {chartData.length > 1 ? (
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={chartData}
              options={{
                title: "Points History",
                curveType: "function",
                legend: { position: "bottom" },
                hAxis: { title: "Date" },
                vAxis: { title: "Points" },
              }}
            />
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Dashboard;