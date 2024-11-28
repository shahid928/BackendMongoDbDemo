const router=require("express").Router();
const User=require("../model/User");
const CryptoJS=require("crypto-js");
const Jwt=require("jsonwebtoken");

 // REGISTER USER

router.post("/register", async(req,resp)=>{
     const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:  CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()//req.body.password,
     });
     
     try{
        const saveUser=await newUser.save();
        resp.status(200).json({
            success:true,
            saveUser,
            message:"User Submit Successfully !!"
        })
       // console.log(saveUser);
     }catch(err){
        resp.status(500).json(err);
       // console.log(err);
     }
    
});

//LOGIN USER

router.post("/login", async(req,resp)=>{

    try{
        const user= await User.findOne({
            email:req.body.email           
        })        
        !user && resp.status(401).json("Wrong Credential !!");
        const hashPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET);
        const originalPassword=hashPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !==req.body.password && resp.status(401).json("wrong credential !!");

        const accessToken=Jwt.sign(
            {
            id:user._id,
            isAdmin:user.isAdmin
           },
           process.env.JWT_SEC,
           {
            expiresIn:"2d"
           }
        )
       
        const {password, ...others}=user._doc;


        resp.status(200).json({
            success:true,
            ...others,
            accessToken
        });
        // resp.status(200).json({
        //     success:true,
        //     user
        // })
    }
    catch(err){
        resp.status(500).json(err)
    }
    

})

module.exports=router;