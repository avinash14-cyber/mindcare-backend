const jwt=require("jsonwebtoken")

const jwtmiddleware=(req,res,next)=>{

    console.log('inside middleware');
    
    const token=req.headers.authorization.split(' ')[1]
   
    
               
try{
    
    
    const decode=jwt.verify(token,process.env.jwt_doctor_secret)
    
    
    req.userID=decode.docid
    
    
    
    
    next()
              
    }catch(err){
        res.status(404).json(err)
    }   
    }

module.exports=jwtmiddleware