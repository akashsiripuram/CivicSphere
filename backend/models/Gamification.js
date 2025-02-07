import mongoose from "mongoose";

const gamificationSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

})