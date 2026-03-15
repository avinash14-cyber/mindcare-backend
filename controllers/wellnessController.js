const emotion=require('../model/emotionModel')

exports.getwellnessController=async(req,res)=>{
    try{
        const result=await emotion.findOne({patientID:req.userID}).select("wellness")
        
        
        
        return res.status(200).json(result)
    }
    catch(err){
        return res.status(500).json(err)
    }

}