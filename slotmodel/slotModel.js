const mongoose=require("mongoose")

const slotSchema=mongoose.Schema({
  
    docId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "doc_lists",
        required:true
    },
   
    date:{
        type:Date,
        required:true
    },
   hour: {
      type: Number,
      required: true
    },

    minute: {
      type: Number,
      required: true
    },
    isAvailable:{
        type:Boolean,
        required:true
    }

})
slotSchema.index(
  { docId: 1, date: 1, hour: 1,minute:1 },
  { unique: true }
);

const Slot=mongoose.model("docslots",slotSchema)
module.exports=Slot