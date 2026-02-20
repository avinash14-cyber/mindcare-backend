const dayjs = require("dayjs");

const doc=require('../doctormodel/doctorauthModel')
const Slot=require('../slotmodel/slotModel')
exports.fetchdocController=async(req,res)=>{
const {date,time}=req.body

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
const daykey=dayMap[dayjs(date).day()]


 const hour = Number(time.hour);
  const minute = Number(time.minute);


const workingDoctors=await doc.find({
    [`slots.${daykey}`]:{
        $elemMatch:{hour,minute}
    }
}) 
const booked=await Slot.find({
  date:new Date(date),
  hour,
  minute,
  isAvailable:false
}).select("docId")

const bookedID=booked.map(item=>(
  item.docId.toString()
))

const availabledocs=workingDoctors.filter(item=>(
  !bookedID.includes(item._id.toString())
))


if(availabledocs.length>0){
  res.status(200).json(availabledocs)
}
else{
  res.status(200).json("No available doctors for this day")
}

}catch(err){
  return res.status(500).json(err)
}


}