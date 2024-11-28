const mongoose=require("mongoose");


const addressSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    addressType:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    companyName:{
        type:String
    },
    country:{
        type:String
    },
    streetAddress:{
        type:String
    },
    apartmentAddress:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipCode:{
        type:String
    },
    mobileNo:{
        type:String
    },
    emailId:{
        type:String
    },
    isActive:{
        type:Boolean
    },
    isShipping:{
       type:Number,
       default:0
    }
})

 module.exports=mongoose.model("Address",addressSchema);