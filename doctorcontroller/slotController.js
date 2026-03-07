const doc=require('../doctormodel/doctorauthModel')

exports.slotController=async(req,res)=>{

    try{

         console.log("Inside controller");
        const {updatedAvailability}=req.body
        const id=req.userID
       
        
        

        const doctor = await doc.findById(id)
        let mergedAvailability={...doctor.slots}

        Object.keys(updatedAvailability).forEach(day=>{
            if(!mergedAvailability[day]){
                mergedAvailability[day]=updatedAvailability[day]
            }
            else{
               updatedAvailability[day].forEach(newSlot => {
          const exists = mergedAvailability[day].some(
            oldSlot => oldSlot.label === newSlot.label
          )

          if (!exists) {
            mergedAvailability[day].push(newSlot)
          }
        })
            }
        })
        
       const result = await doc.findByIdAndUpdate(
      id,
      { slots: mergedAvailability },
      { new: true }
    )

        res.status(200).json(result)
       
    }
    catch(err){
            res.status(500).json(err)
    }
}

// fetch

exports.fetchSlotController=async(req,res)=>{
    try{
         const id=req.userID
        const result=await doc.findOne({_id:id})
        if (!result) {
      return res.status(404).json({ message: "Doctor not found" })
    }

    res.status(200).json(result.slots || [])
       
        
        
    }
    catch(err){
                res.status(500).json(err)
    }
}

// delete

exports.deleteSlotController=async(req,res)=>{

      
    const {label,Day}=req.body
    
    
    const id=req.userID
    
    try{
      const result=await doc.findByIdAndUpdate(
      {_id:id},
    {
      $pull:{
        [`slots.${Day}`]:{label:label}
      }
    },{new:true})

    if(!result){
      res.status(400).json("Something went wrong")
    }
    else{
      res.status(200).json("Deleted successfully")
      console.log("hurray");
      
    }
    }catch(err){
      return res.status(500).json(err)
    }
    
    
    
}