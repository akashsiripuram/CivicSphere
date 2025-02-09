import mongoose, { Mongoose } from "mongoose";

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category:{
    type: String,
    required: true,
    enum:['education','healthcare','environment','politics','cleanliness', 'transport', 'energy',  'disaster relief','other']
  },
  status:{
   type: String,
   default:"active",
   enum:['active','completed','cancelled']
  },
  startDate:{
    type: Date,
   
    default: Date.now
  },
  endDate:{
    type: Date,
    required: true
  },
  members:{
    type: Array,
    default:[]
  },
  tasks:{
    type: Array,
    default:[]
  },
  images:{
    type: Array,
    default:[]
  },
  fundingGoal:{
    type: Number,
    default:0
  },
  donors:{
    type: Array,
    default:[]
  },
  paymentLink:{
    type: String,
    default:''
  },
  location: {
    city: { type: String }, 
    coordinates: {
      lat: { type: Number, default: null }, 
      lng: { type: Number, default: null }  
    }
  },
  level:{
    type: String,
    enum:['small','medium','large'],
    default:'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
