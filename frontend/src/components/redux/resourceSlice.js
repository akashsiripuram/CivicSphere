import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 isLoading:false,
 resources:[]
};

export const fetchResources = createAsyncThunk("/resources", async () => {
 const response = await axios.get("http://localhost:8000/api/resources");
 return response.data;
});

const resourceSlice=createSlice({
    name:"resource",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchResources.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(fetchResources.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.resources=action.payload.resources;
        }),
        builder.addCase(fetchResources.rejected,(state,action)=>{
            state.isLoading=false;
            console.log("Error fetching resources",action.error);
        })
    }
});

export default resourceSlice.reducer;