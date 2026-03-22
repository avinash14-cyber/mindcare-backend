const appo=require('../model/appointmentsModel')

exports.allIdController=async(req,res)=>{

   
    try{
         const id=req.userID
        const result=await appo.findOne({doctorId:id,status:"BOOKED"}).select("patientId date hour minute").populate("patientId","name ") .sort({ date: 1, hour: 1, minute: 1 })
        console.log(result);
        
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}