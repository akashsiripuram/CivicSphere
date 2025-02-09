import mongoose from "mongoose";

const gamificationSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    points:{
        type: Number,
        default:0
    },
    badges:{
        type: Array,
        default:[]
    },
    activityLogs:{
        type: Array,
        default:[]
    }

})

const Gamification=mongoose.model("Gamification",gamificationSchema);

export default Gamification;