const router=require("express").Router();
const User=require("../model/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");



router.put("/userUpdate/:id", verifyTokenAndAuthorization, async(req,resp)=>{   
    console.log(req.body);
    if(req.body.password){
       req.body.password= CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()
    }
    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        
        resp.status(200).json(updateUser)
       

    }catch(err){
        res.status(500).json(err);
    }
   // const user= await User.create(req.body);

   // resp.send(req.body);
})

//DELETE USER

router.delete("/userDelete/:id", verifyTokenAndAuthorization, async(req,resp)=>{

    try{
        let userDelete=await User.findByIdAndDelete(req.params.id)
        resp.status(200).json(
           {
               success:true,
               mesaage:" User Deleted Successfully !!!",
               userDelete
           }
        )

    }catch(err){
        resp.status(500).json({
            success:false,
            mesaage:"Something went Wrong !!",
            err
        })
    }
     
})


//Get User

router.get("/login/:id", verifyTokenAndAdmin, async(req,resp)=>{

    try{
        let userFind=await User.findById(req.params.id)
        const {password,...other}=userFind._doc;
        resp.status(200).json(
           {
               success:true,             
               other
           }
        )

    }catch(err){
        resp.status(500).json({
            success:false,
            mesaage:"Something went Wrong !!",
            err
        })
    }
     
});
//Get ALL User
router.get("/userall", verifyTokenAndAdmin, async(req,resp)=>{
    try{
        let userAll=await User.find()      
        resp.status(200).json(userAll)       
        

    }catch(err){
        resp.status(500).json({
            success:false,
            mesaage:"Something went Wrong !!",
            err
        })
    }
});

module.exports=router;