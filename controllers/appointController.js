const Slot=require('../slotmodel/slotModel')
const appo=require('../model/appointmentsModel')
const mongoose=require('mongoose')
const Emotion = require("../model/emotionModel");
exports.appointmentController=async(req,res)=>{

    const currentsession=await mongoose.startSession()

    try{
        currentsession.startTransaction();
        const patid=req.userID
        const{doctor,time,date,session}=req.body
            // console.log(doctor);
            // console.log(time);
            // console.log(date);
            // console.log(session);
            console.log(req.body);
            
            
            
            
            
            
        await Slot.create(
            [{
                docId:doctor.id,
                date:new Date(date),
                hour:time.hour,
                minute:time.minute,
                isAvailable:false

     } ],
      {session:currentsession}  )


await appo.create(
    [{
        patientId:patid,
        doctorId:doctor.id,
        session,
        date:new Date(date),
        hour:time.hour,
        minute:time.minute,
        status: "BOOKED"
    }],
{session:currentsession})

    let emotion = await Emotion.findOne({ patientID: patid }).session(currentsession)

if (!emotion) {
  await Emotion.create([{
    patientID: patid,
    wellness: 55
  }], { session: currentsession })
} else if (emotion.wellness < 95) {
  emotion.wellness += 5
  await emotion.save({ session: currentsession })
}

        await currentsession.commitTransaction();
        currentsession.endSession();
        res.status(200).json("Appointment booked")
      
        
    }catch(err){
        console.error("Transaction error:", err);
        await currentsession.abortTransaction();
        currentsession.endSession();
        res.status(500).json("Booking Failed")
    }
}