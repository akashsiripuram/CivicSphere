import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues,addIssue } from "../../components/redux/issueSlice";
import CreateIssueModal from "./CreateIssueModel";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Loader2 } from "lucide-react";

const Issue = () => {
  const dispatch = useDispatch();
  const { issues, isLoading } = useSelector((state) => state.issue);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Issues</h1>
        <CreateIssueModal />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {issues && issues.length > 0 ? (
            issues.map((issue) => (
              <Card key={issue._id} className="p-4 flex flex-col gap-2">
                {issue.images && (
                  <img
                    src={issue.images}
                    alt="Issue"
                    className="h-48 w-full object-cover rounded-md"
                  />
                )}
                <div className="flex flex-wrap justify-between items-center">
                  <Badge variant="outline">{issue.issueType}</Badge>
                  <Badge className="bg-red-500 text-white">{issue.priority}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {issue.description.length > 150
                    ? issue.description.slice(0, 150) + "..."
                    : issue.description}
                </p>
                <div className="text-xs text-gray-500 mt-auto">
                  <strong>Coordinates:</strong>{" "}
                  {issue.location?.coordinates?.[1]}, {issue.location?.coordinates?.[0]}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">No issues reported yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Issue;
