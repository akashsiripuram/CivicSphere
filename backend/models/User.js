import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,       
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['citizen','community_leader','gov_official']
    },
    logs: [
        {
          pointsAdded: { type: Number, required: true }, // Points added or subtracted
          reason: { type: String, required: true }, // Reason for the change
          date: { type: Date, default: Date.now }, // Date of the change
        }
      ],      
    points:{
        type:Number,
        default:0
    },
    badges:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const User=mongoose.model("User",userSchema);

export default User;