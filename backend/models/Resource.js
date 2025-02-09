import mongoose from 'mongoose';

const resourceSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum: [
            'Household Items',
            'Electronics & Gadgets',
            'Books & Stationery',
            'Clothing & Accessories',
            'Tools & Equipment',
            'Food & Essentials',
            'Health & Hygiene',
            'Kids & Baby Items',
            'Sports & Fitness',
            'Sustainable Living',
            'Educational & Office Supplies'
          ]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        required:true,
        enum: ['available','inavailable']
    },
    price:{
        type: Number,
        default:0
    },
    images:{
        type: String,
        default:""
    },
    description:{
        type: String,
        required:true
    },
    ratings:{
        type: Number,
        default:0,
        min:0,
        max:5
    },
    comments:{
        type: Array,
        default:[]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

const Resource=mongoose.model("Resource",resourceSchema);

export default Resource;