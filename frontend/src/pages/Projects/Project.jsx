import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../components/redux/projectSlice";

function Project() {
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector((state) => state.project);
  console.log(isLoading);
  console.log(projects);

  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <h1>Project</h1>
      {projects && (
        <div>
          {projects.map((project) => (
            <div key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project;
