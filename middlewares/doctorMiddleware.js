const jwt=require("jsonwebtoken")

const jwtmiddleware=(req,res,next)=>{

    const token=req.headers.authorization.split(' ')[1]
    console.log(token)
    
               
try{
    
    
    const decode=jwt.verify(token,process.env.jwt_doctor_secret)
    
    
    req.userID=decode.docid
    console.log(req.userID);
    console.log("finished middleware");
    
    next()
              
    }catch(err){
        res.status(404).json(err)
    }   
    }

module.exports=jwtmiddleware