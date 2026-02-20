const jwt=require("jsonwebtoken")

const jwtmiddleware=(req,res,next)=>{

    console.log("insidejwttttt");
    
    const token=req.headers.authorization.split(' ')[1]
    console.log(token)
    
               
try{
    console.log("inside try");
    
    const decode=jwt.verify(token,process.env.jwt_secret)
    
    
    req.userID=decode.userid
    console.log(req.userID);
    console.log(req.body);
    next()
              
    }catch(err){
        res.status(404).json(err)
    }   
    }

module.exports=jwtmiddleware