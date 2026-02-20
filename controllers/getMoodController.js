const emotions=require('../model/emotionModel')

exports.recentMoodController=async(req,res)=>{
    
    const id=req.userID
    const result= await emotions.findOne({patientID:id})
    return res.status(200).json(result.moods)
    
    
    
}