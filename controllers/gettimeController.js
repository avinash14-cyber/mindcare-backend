const appo=require('../model/appointmentsModel')

exports.allTimeController=async(req,res)=>{
   
    
    try{
        
        
        const appointment = await appo.findOne({
  patientId: req.userID,
  status: "BOOKED"
})
.sort({ date: 1, hour: 1 }).select("date hour minute").populate("doctorId", "name ")




res.status(200).json(appointment)
    }catch(err){
        res.status(500).json(err)
    }

}