const router=require("express").Router();
const Product=require("../model/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");


// router.post("/newProduct", verifyTokenAndAdmin, async(req,resp)=>{
    router.post("/newProduct",async(req,resp)=>{
   
    try{
        const saveProduct= await Product.create(req.body);
        console.log(saveProduct,"=======>")
        resp.status(200).json({
            success:true,
            message:"Product Save Successfully !!",
            saveProduct
        })

    }catch(err){

        resp.status(500).json(err);
    }
})

// Update Product

// router.put("/updateProduct/:id", verifyTokenAndAdmin, async(req,resp)=>{
    router.put("/updateProduct/:id",async(req,resp)=>{
   
    try{
        let updateProduct= await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        // const saveProduct= await Product.create(req.body);
        // console.log(saveProduct,"=======>")
        resp.status(200).json({
            success:true,
            message:"Product Updated Successfully !!",
            updateProduct
        })

    }catch(err){

        resp.status(500).json(err);
    }
})


// Find Product

router.put("/findProduct/:id", verifyTokenAndAdmin, async(req,resp)=>{
   
    try{
        let product= await Product.findById(req.params.id)
        // const saveProduct= await Product.create(req.body);
        // console.log(saveProduct,"=======>")
        resp.status(200).json({
            success:true,           
            product
        })

    }catch(err){

        resp.status(500).json(err);
    }
});

// GET ALL Product

router.get("/allProduct", verifyTokenAndAdmin, async(req,resp)=>{
       
     const queryNew=req.query.new;
     const queryCategory=req.query.category;

    try{
        let products;
         
        if(queryNew){
            products=await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(queryCategory){
            products=await Product.find({
                categories:{
                    $in:[queryCategory],
                }
              
            });
        }
        else{
            products= await Product.find()
        }
        resp.status(200).json({
            success:true,           
            products
        })

    }catch(err){

        resp.status(500).json(err);
    }
})

//GET PRODUCT ---

router.get('/getproducts', async(req,resp)=>{
    try{
        const products= await Product.find();
        resp.status(200).json(products);
    }catch(err){
        resp.status(500).json(err);
    }
    
})

router.delete('/deleteproduct/:id', async(req,resp)=>{
  
    try{
        let deleteproduct= await Product.findByIdAndDelete(req.params.id);
        resp.status(200).json({deleteproduct,message:"Product Deleted Successfully !!!"})
    }catch(err){
        resp.status(500).json(err);
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