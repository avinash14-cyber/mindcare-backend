const appo=require('../model/appointmentsModel')
const Slot=require('../slotmodel/slotModel')

exports.deleteAppointmentController=async(req,res)=>{

    try{

        const{hour,minute,date}=req.body
   
    
    await appo.deleteOne({
        patientId:req.userID,
        status:"BOOKED"
    })

    await Slot.deleteOne({
        date,
        hour,
        minute,
        isAvailable:false
    })
    return res.status(200)
    }catch(err){
        return res.status(500).json(err)
    }
    
}