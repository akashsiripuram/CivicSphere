import { getProject } from "../../components/redux/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProjectDetail() {
    const projectId=useParams();
    const {project,isLoading}=useSelector((state)=>state.project);
    const dispatch=useDispatch();
console.log("something",projectId);
    useEffect(()=>{
        dispatch(getProject(projectId.id))

    },[]);
    console.log("Hello",project)
    
    return ( 
        isLoading? <h1>Loading...</h1>:
        <div>
            <div>{project.title}</div>
            <div>{project.description}</div>
            <div>{project.fundingGoal}</div>
            <div>{project.members}</div>
            <div>{new Date(project.startDate).toLocaleDateString()}</div>
            <div>{new Date(project.endDate).toLocaleDateString()}</div>
            <div>{project.category}</div>
            
        </div>

     );
}

export default ProjectDetail;