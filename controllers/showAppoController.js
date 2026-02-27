const appo=require('../model/appointmentsModel')

exports.showApoointmentController=async(req,res)=>{
    console.log("inside controllerrrr");
    
    console.log(req.userID);
    
    try{
        const appointment = await appo.findOne({
  patientId: req.userID,
  status: "BOOKED"
})
.sort({ date: 1, hour: 1 }).select("date hour minute session") 
.populate("doctorId", "name speciality")


res.status(200).json(appointment)
    }catch(err){
        res.status(500).json(err)
    }

}