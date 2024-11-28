const router=require("express").Router();
const Category=require("../model/Category");

// ADD CATEGORY
router.post("/",async(req,resp)=>{

    try{
    const categories=await Category.create(
        { 
            name: req.body.name,
            image:req.body.image,
            color:req.body.color,
            ishome:req.body.ishome
        }
        );
        resp.status(200).json({
            success:true,
            categories

        })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});

// DELETE CATEGORY

router.delete("/:id",async(req,resp)=>{

    try{
    const deletecategories=await Category.findByIdAndDelete(req.params.id);      
       
        resp.status(200).json({
            success:true,
            deletecategories,
            message:"Category Deleted Succesffuly !!"

        })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});


// UPDATE CATEGORY
router.put("/:id",async(req,resp)=>{

    try{
    const updatecategories=await Category.findByIdAndUpdate(req.params.id,{
        $set:req.body
    });      
       
        resp.status(200).json({
            success:true,
            updatecategories,
            message:"Category Updated Succesffuly !!"

        })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});


// GET ALL CATEGORY
router.get("/",async(req,resp)=>{

    try{
    const categories=await Category.find();   
       
        resp.status(200).json({
            success:true,
            categories,          

        })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});

// FIND CATEGORY
router.get("/:key",async(req,resp)=>{

    try{
    const categories=await Category.findById(req.params.id,{
         
    });   
       
        resp.status(200).json({
            success:true,
            categories,          

        })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});

// GET POPULAT CATEGORY
router.get("/all",async(req,resp)=>{

    try{
    const popcategories=await Category.find();   
    resp.status(200).json(popcategories)
       
        // resp.status(200).json({
        //     success:true,
        //     popcategories,          

        // })
    }
    catch(err){
        resp.status(500).json({
            success:false,
            message:"Something went wrong!!"
        })
    }
});

module.exports=router;


