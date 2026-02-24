const doc=require('../doctormodel/doctorauthModel')
const appo=require('../model/appointmentsModel')
const dayjs=require('dayjs')
exports.followUpController=async(req,res)=>{
    const {date,id}=req.body
    
  try{
      const dayMap = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA"
};

const dayKey = dayMap[dayjs(date).day()];
const doctor = await doc.findById(id).select(`slots.${dayKey}`);

const bookedAppointments = await appo.find({
  doctorId:id,
  date: new Date(date),
  status: "BOOKED"
}).select("hour minute");

const bookedSet = new Set(
  bookedAppointments.map(a => `${a.hour}:${a.minute}`)
);

const availableSlots = doctor.slots[dayKey].filter(
  slot => !bookedSet.has(`${slot.hour}:${slot.minute}`)
);


    return res.status(200).json(availableSlots)
  }catch(err){
    return res.status(400).json("No free slots,try another date")
  }
  
    
}