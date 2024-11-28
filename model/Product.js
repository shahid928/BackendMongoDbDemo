const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
       // unique:true
    },
    desc:{
        type:String,
        required:true,
       
    },
    image:{
        type:String,
        required:true
    },
    categoriesId:{
        // type:Array,
        type:String,
        
    },
    categories:{
        // type:Array,
        type:String,
        
    },
    size:{
        type:String,
       
    },
    color:{
        type:String,
       
    },
    price:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        default:0
    },
    markInOfferSection:{
       type:String,

    },
    rating:{
        type:Number,
        default:0
    },
    numReview:{
        type:Number,
        default:1
    },
    quantity:{
        type:Number,
        default:1
    },
    isFeatured:{
        type:Boolean,
        default:false
    },

},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);