
const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },

    image:{
        type:String
    },
    color:{
        type:String
    },
    ishome:{
        type:Number,      
    }
   
}

)

module.exports=mongoose.model("Category",categorySchema)