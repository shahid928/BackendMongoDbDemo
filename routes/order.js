const router=require("express").Router();
const Order=require("../model/Order");

// Create Cart
router.post("/", async(req,resp)=>{

    const nOrder=new Order(req.body);
    try{
        const saveOrder= await nOrder.save();
        resp.status(200).json({
            succesfull:true,
            saveOrder
        })
    }catch(err){
        resp.status(500).json(err);
    }
});


// Update Cart
router.put("/updateOrder/:id", async(req,resp)=>{

    
    try{
        let updateOrder= await Order.findByIdAndUpdate(req.params,id,{
            $set:req.body
         })
        resp.status(200).json({
            succesfull:true,
            updateOrder
        },{new:true})
    }catch(err){
        resp.status(500).json(err);
    }
});


// Delete Cart
router.delete("/deleteCart/:id", async(req,resp)=>{

    
    try{
        let deleteOrder= await Order.findByIdAndDelete(req.params,id)
        resp.status(200).json({
            succesfull:true,
            deleteOrder,
            message:"Your Cart Record have been deleted !!!"
        },{new:true})
    }catch(err){
        resp.status(500).json(err);
    }
});

// GET USER Cart
router.get("/find/:userId", async(req,resp)=>{

    try{
        let orderList= await Order.find({userId:req.params.userId})
        resp.status(200).json({
            succesfull:true,
            orderList,            
        },{new:true})
    }catch(err){
        resp.status(500).json({
            success:false,
            message:"No Cart Availabel !!",
            err
        });
    }
});


//GET ALL

router.get("/all",async(req,resp)=>{
   
    try{
        let orders=await Order.find();
        if(orders.length >0){
            resp.status(200).json({
                success:true,
                orders
                
            });
        }else{
            resp.status(500).json({
                success:false,
                message:"No Data Found!!",
             
                
            });
        }
       

    }catch(err){
        resp.status(500).json({
            success:false,
            message:"No Orders Availabel !!",
            err
        });
    }
    

})



// router.get("/user",(req,resp)=>{
//     resp.send(" Its Working Now..")
// });

// router.post("/register", async(req,resp)=>{   
//     console.log(req.body);
//     const user= await User.create(req.body);
    
//     resp.send(req.body);
// })

module.exports=router;