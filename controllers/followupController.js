const appo=require('../model/appointmentsModel')

exports.followAppointController=async(req,res)=>{
    try{

    const patid=req.userID;
    const latest=await appo.findOne({patientId:patid}).sort({ date: -1, hour: -1, minute: -1 }).select("status doctorId").populate("doctorId","name speciality exp")
   
    res.status(200).json(latest)
    
    }catch(err){
        return res.status(500).json("Failed to get details")
    }

}