import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../components/redux/issueSlice";
function Issue() {
  const { isLoading, issues } = useSelector((state) => state.issue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIssues());
  }, []);
  return (
    <div>
        <h1>Issues</h1>
    
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {issues.map((issue) => (
            <div key={issue.id}>
              <p>{issue.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Issue;
