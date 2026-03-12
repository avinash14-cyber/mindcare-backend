const appo=require('../model/appointmentsModel')

exports.getAppointmentController=async(req,res)=>{

    try{

    const data= await appo.find({
  doctorId:req.userID,
  status: "BOOKED"
})
.select("hour minute session date patientId")
.populate("patientId", "name wellness");

return res.status(200).json(data)

    }catch(err){
        return res.status(500).json(err)
    }
}