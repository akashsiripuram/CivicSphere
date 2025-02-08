import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../components/redux/issueSlice";
import { MapPin, AlertCircle, Clock, CheckCircle, Filter } from "lucide-react";

function Issues() {
  const { isLoading, issues } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const filteredIssues = filter
    ? issues.filter((issue) => issue.issueType === filter)
    : issues;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">Community Issues</h1>
        
        {/* Filter Section */}
        <div className="flex items-center mb-4 space-x-4">
          <Filter className="text-gray-600" />
          <select
            className="border p-2 rounded-md shadow-sm"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Issues</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Environment">Environment</option>
            <option value="Public Safety">Public Safety</option>
          </select>
        </div>

        {/* Issues List */}
        {isLoading ? (
          <h1 className="text-center text-lg text-gray-700">Loading...</h1>
        ) : (
          <div className="grid gap-4">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-white shadow-md p-4 rounded-lg flex items-start space-x-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{issue.issueType}</h2>
                  <p className="text-gray-600 mt-1">{issue.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3">
                    {/* <MapPin className="h-4 w-4" /> <span>{issue.location}</span> */}
                    <Clock className="h-4 w-4" /> <span>{new Date(issue.createdAt).toLocaleString()}</span>
                    {issue.status === "Resolved" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Issues;
