import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 isLoading:false,
 emergencies:[],
 emergency:null,
};

export const getAllEmergencies=createAsyncThunk(
    "/emergency",
    
    async () => {
        console.log("coming to eme")
        const response = await axios.get("http://localhost:8000/api/emergency");
        return response.data;
    }
)
export const addEmergency=createAsyncThunk(
    "/emergency/add",
    async (formData) => {
        const response = await axios.post("http://localhost:8000/api/emergency/add",formData,
            {
                withCredentials:true
            }
        );
        return response.data;
    }
)

const emergencySlice=createSlice({
    name:"issue",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllEmergencies.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(getAllEmergencies.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.emergencies=action.payload.emergencies;
        }),
        builder.addCase(getAllEmergencies.rejected,(state,action)=>{
            state.isLoading=false;
            console.error(`Failed to fetch issues: ${action.error.message}`);
        })
        builder.addCase(addEmergency.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(addEmergency.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.emergencies.push(action.payload.emergencies);
        }),
        builder.addCase(addEmergency.rejected,(state,action)=>{
            state.isLoading=false;
            console.error(`Failed to add issue: ${action.error.message}`);
        })
    }
});

export default emergencySlice.reducer;