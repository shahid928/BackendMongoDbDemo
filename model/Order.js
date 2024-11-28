const mongoose=require("mongoose");


const orderSchema=new mongoose.Schema({
    
    userId:{
        type:String,
        required:true,
       // unique:true
    },
    products:[
        {
            productId:{
                type:String
            },
            productName:{
                type:String
            },
            productDesc:{
                type:String
            },
            productSize:{
                type:String
            },
            productColor:{
                type:String
            },
            productPrice:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    amount:{
        type:Number,
        required:true
    },
    address:[{
          address1:{
            type:String,
          },
          country:{
            type:String,
          },
          state:{
            type:String,
          },
          city:{
            type:String,
          },
      }],
    status:{
        type:String,
        default:"pending"
    }

},{timestamps:true});

module.exports=mongoose.model("Order",orderSchema);