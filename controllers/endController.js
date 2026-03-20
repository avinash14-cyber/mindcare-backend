const appo=require('../model/appointmentsModel')

exports.endSessionController=async(req,res)=>{
    try {
        const Id=req.userID
            console.log("inside end controller");
            console.log(Id);
            
        const updatedAppointment = await appo.findOneAndUpdate(
  {
    patientId: Id,
    status: "BOOKED"
  },
  {
    $set: { status: "ATTENDED" }
  },
  {
    new: true 
  }
)

return res.status(200).json("Session ended successfully")
        
}catch (error) {
        console.error("Error ending session:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}