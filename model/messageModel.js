const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({ 
    chatId:{
        type:String,
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_list",
        required:true
    },
    receiversId:{
        type:mongoose.Schema.Types.ObjectId,
        
        required:true
    },  
    text:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})
const messages=mongoose.model("messages",messageSchema)
module.exports=messages