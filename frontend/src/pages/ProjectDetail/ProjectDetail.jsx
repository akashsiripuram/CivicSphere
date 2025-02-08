import { getProject } from "../../components/redux/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProjectDetail() {
    const projectId=useParams();
    const {projects,isLoading}=useSelector((state)=>state.project);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProject(projectId))

    },[]);
    console.log(projects)
    
    return ( 
        isLoading? <h1>Loading...</h1>:
        <div>
            <h1>{projects.title}</h1>
            <p>{projects.description}</p>
        </div>

     );
}

export default ProjectDetail;