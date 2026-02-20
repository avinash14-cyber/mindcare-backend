const doc=require('../doctormodel/doctorauthModel')
const jwt=require('jsonwebtoken')
exports.docAuthController=async(req,res)=>{

    const{name,license,password,speciality,exp}=req.body
    try{
            const result= await doc.findOne({license})
    if(result){
       return res.status(400).json("Already existing user")
    }
    else{
        const docdetails=new doc({
            name,
            license,
            password,
            speciality,
            exp
        })

        await docdetails.save()
        res.status(200).json(docdetails)
    }
    }catch(err){
       
           return res.status(500).json(err)
    }
    
}



// doc login

exports.docLoginController=async(req,res)=>{

    const {license,password}=req.body
    const result=await doc.findOne({license})
    if(result){
        if(result.password==password){
             try{
        
        
        
            const token=jwt.sign({docid:result._id},process.env.jwt_doctor_secret)
            return res.status(200).json({docInfo:{name:result.name,
                speciality:result.speciality},
                token})
        
        
    }catch(err){
            return res.status(500).json(err)
    }
        
    }
    else{
        return res.status(400).json("Wrong password")
    }
   
    

}
else{
    return res.status(401).json("No registered user")
}
}