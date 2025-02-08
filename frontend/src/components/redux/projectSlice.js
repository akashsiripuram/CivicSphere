import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    projects: []
};

// Fetch projects
export const fetchProjects = createAsyncThunk("/project", async () => {
    const response = await axios.get("http://localhost:8000/api/project");
    return response.data;
});

// Add project
export const addProject = createAsyncThunk("/project/add", async (formData) => {
    const response = await axios.post("http://localhost:8000/api/project/add", formData, {
        withCredentials: true, // Ensure authentication
    });
    return response.data;
});

// Join project
export const joinProject = createAsyncThunk("/project/join", async (projectId) => {
    const response = await axios.post(`http://localhost:8000/api/project/${projectId}/join`, {}, {
        withCredentials: true,
    });
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
            });
    }
});

export default projectSlice.reducer;
