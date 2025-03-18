import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    projects: [],
    project:null
};

// Fetch projects
export const fetchProjects = createAsyncThunk("/project", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project`);
    return response.data;
});

// Add project
export const addProject = createAsyncThunk("/project/add", async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/add`, formData, {
        withCredentials: true, // Ensure authentication
    });
    return response.data;
});

// Join project
export const joinProject = createAsyncThunk("/project/join", async (projectId) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}/join`, {}, {
        withCredentials: true,
    });
    return response.data;
});
export const getProject=createAsyncThunk("/project/get",async(projectId)=>{
   
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`,{
        withCredentials: true,
    })
    return response.data;
})
export const requestProject = createAsyncThunk("/project/request", async (projectId,userId)=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/request`,{projectId,userId}, {
        withCredentials: true,
    })
    return response.data;
})

export const assignProject = createAsyncThunk("/assign",async (projectId,userId)=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}/assign`,{userId}, {
        withCredentials: true,
    })
    return response.data;
});


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch projects
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload.success ? action.payload.project : [];
            })
            .addCase(fetchProjects.rejected, (state) => {
                state.isLoading = false;
            })
            
            // Join project
            .addCase(joinProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinProject.fulfilled, (state, action) => {
                state.isLoading = false;
                
                if (action.payload.success) {
                    // Update only the joined project in the state
                    state.projects = state.projects.map(project =>
                        project._id === action.payload.project._id ? action.payload.project : project
                    );
                }
            })
            .addCase(joinProject.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getProject.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getProject.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.project=action.payload.project;
            })
            .addCase(getProject.rejected,(state)=>{
                state.isLoading=false;
                
            })
            .addCase(requestProject.rejected,(state,action)=>{
                console.log("Failed to request project",action.error);
                state.isLoading=false;
            })
            .addCase(requestProject.fulfilled,(state,action)=>{
                state.isLoading=false;
                console.log("Project requested successfully",action.payload);
                state.projects=state.projects.map(project=>
                    project._id === action.payload._id? {...project, requested: true} : project
                );
                state.project=action.payload.project;
            })
            .addCase(requestProject.pending,(state)=>{
                state.isLoading=true;
            })
    }
});

export default projectSlice.reducer;
