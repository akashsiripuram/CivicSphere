import mongoose from "mongoose";

const EmergencySchema=mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:['Fire','Earthquake','Natural Disaster']
    },
    location:{
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true } 
    },
    reportedBy:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        required:true,
        enum: ['pending','resolved']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

const Emergency=mongoose.model("Emergency",EmergencySchema);

export default Emergency;