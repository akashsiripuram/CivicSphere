import mongoose from "mongoose";

const EmergencySchema=mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:['Fire','Earthquake','Natural Disaster']
    },
    location:{
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String },
        address: { type: String }
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