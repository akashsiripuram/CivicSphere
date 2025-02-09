import mongoose from "mongoose";

<<<<<<< HEAD
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
=======

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
>>>>>>> 3cadb8fd4b5b49cf149d9d17a9aba055d5f0887c
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['citizen', 'community_leader', 'gov_official']
    },
    logs: [
        {
            pointsAdded: { type: Number, required: true }, // Points added or subtracted
            reason: { type: String, required: true }, // Reason for the change
            date: { type: Date, default: Date.now }, // Date of the change
        }
    ],
    points: {
        type: Number,
        default: 0
    },
    badges: {
        type: Array,
        default: []
    },
<<<<<<< HEAD
    createdAt: {
        type: Date,
        default: Date.now
=======
    assignedTo:{
        role:{
            type:String,
            enum:['community_leader','gov_official']
        },
        userId:{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
>>>>>>> 3cadb8fd4b5b49cf149d9d17a9aba055d5f0887c
    }
});

const User = mongoose.model("User", userSchema);

export default User;