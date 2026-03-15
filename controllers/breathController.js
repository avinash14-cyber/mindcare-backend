const emotion=require('../model/emotionModel')

exports.breathingPointsController=async(req,res)=>{

    try{
        const id=req.userID
        await emotion.updateOne(
  { patientID: id },
  { $inc: { wellness: 5 } }
);
        }catch(err){
            return res.status(500).json(err)
        }
}