
const mongoose=require('mongoose')

const emotionSchema=mongoose.Schema({

    patientID: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user_list",
  required: true
},

   moods: {
    type: [
      {
        emotion: {
          type: String,
          required: true
        },
        influencers: {
          type: [String],
          default: []
        },
       
      }
    ],
    
  },
    comments:{
        type:String,
        required:false
    }
})

const emotions=mongoose.model("user_emotions",emotionSchema)
module.exports=emotions
