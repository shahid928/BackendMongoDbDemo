const Jwt=require("jsonwebtoken");

const verifyToken=(req,resp,next)=>{
   const authHeader=req.headers.token;
  
   if(authHeader){      
     
        const token =authHeader.split(" ")[1];  
        console.log(token,process.env.JWT_SEC,"====Token Header")        
        Jwt.verify(token, process.env.JWT_SEC,(err,user)=>{        
        if(err){
            return resp.status(403).json("Token in not Valid !!")
        }
        console.log( req.user,"====Token Header33")
        req.user=user;
        next();
        })
   }
   else{
     return resp.status(401).json("You are not authenticated !!")
   }
}

 const verifyTokenAndAuthorization=(req,resp,next)=>{
 
         verifyToken(req,resp,()=>{
          console.log(req.user.id,req.params.id,"========USER ID")
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }
            else{
                resp.status(401).json("You are not allow to do that !!")
            }
         })
 }

 const verifyTokenAndAdmin=(req,resp,next)=>{
 
  verifyToken(req,resp,()=>{
   console.log(req.user.id,req.params.id,"========USER ID")
     if(req.user.isAdmin){
         next();
     }
     else{
         resp.status(401).json("You are not allow to do that !!")
     }
  })
}

module.exports={verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin};