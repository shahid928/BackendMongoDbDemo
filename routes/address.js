const router=require("express").Router();

const Address=require('../model/Address');


router.post("/saveAddress", async (req,resp)=>{
     
    try{
        const saveAddrs= await Address.create(req.body);
        resp.status(200).json({
            success:true,
            message:"Address save Successfully",
            saveAddrs
        });

    }catch(e){
         resp.status(500).json(e)
    }

})

router.get("/",async(req,resp)=>{
    try{
        const getAddress=await Address.find();
        resp.status(200).json(getAddress);
    }catch(e){
        resp.status(500).json(e);
    }
})

module.exports=router;

