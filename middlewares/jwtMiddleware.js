const jwt=require("jsonwebtoken")

const jwtmiddleware=(req,res,next)=>{

    console.log("insidejwttttt");
    
    
    const token=req.headers.authorization.split(' ')[1]
    
    
               
try{
    
    
    const decode=jwt.verify(token,process.env.jwt_secret)
    
    
    req.userID=decode.userid
    next()
              
    }catch(err){
        res.status(404).json(err)
    }   
    }

module.exports=jwtmiddleware