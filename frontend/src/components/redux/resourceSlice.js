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
export const addResouce=createAsyncThunk("/resources/add",async(newResource)=>{
    const response=await axios.post("http://localhost:8000/api/resources/add",newResource,{
        withCredentials:true
    });
    return response.data;
})

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
        builder.addCase(addResouce.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(addResouce.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.resources=[...state.resources,action.payload.resource];
        }),
        builder.addCase(addResouce.rejected,(state,action)=>{
            state.isLoading=false;
            console.log("Error adding resource",action.error);
        })
        
    }
});

export default resourceSlice.reducer;