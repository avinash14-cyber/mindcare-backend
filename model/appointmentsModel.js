const mongoose=require("mongoose")

const appointmentSchema=mongoose.Schema({

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_list",
      required: true
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "doc_lists",
      required: true
    },
    session:{
        type:String,
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
    status:{
        type:String,
        required:true
    },

   
},
{timestamps:true});

const appo=mongoose.model("appointments",appointmentSchema)
module.exports=appo