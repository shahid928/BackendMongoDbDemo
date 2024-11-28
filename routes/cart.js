const router=require("express").Router();
const Cart=require("../model/Cart");

// Create Cart
router.post("/", async(req,resp)=>{
    const nCart=new Cart(req.body);
    try{
        const saveCart= await Cart.create(req.body);
       // const saveCart= await nCart.crea();
        resp.status(200).json({
            succesfull:true,
            saveCart,
            message:"Your product save in Cart !!"
        })
    }catch(err){
        resp.status(500).json(err);
    }
});


// Update Cart
router.put("/updateCart/:id", async(req,resp)=>{

    
    try{
        let updateCart= await Cart.findByIdAndUpdate(req.params,id,{
            $set:req.body
         })
        resp.status(200).json({
            succesfull:true,
            updateCart
        },{new:true})
    }catch(err){
        resp.status(500).json(err);
    }
});


// Delete Cart
router.delete("/deleteCart/:id", async(req,resp)=>{

    
    try{
        let deleteCart= await Cart.findByIdAndDelete(req.params.id)
        resp.status(200).json({
            succesfull:true,
            deleteCart,
            message:"Your Cart Record have been deleted !!!"
        },{new:true})
    }catch(err){
        resp.status(500).json(err);
    }
});

// GET USER Cart
router.get("/find/:userId", async(req,resp)=>{

    try{
        let cartList= await Cart.findOne({userId:req.params.userId})
        resp.status(200).json({
            succesfull:true,
            cartList,            
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
        let carts=await Cart.find();
        if(carts.length >0){
            resp.status(200).json({
                success:true,
                carts
                
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
            message:"No Cart Availabel !!",
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