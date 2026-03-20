const messages = require("../model/messageModel")

exports.getChatHistoryController=async(req,res)=>{
    const {chatId}=req.params
    try{
        const chatHistory=await messages.find({chatId}).sort({timestamp:1})
        res.status(200).json(chatHistory)
    }catch(err){
        res.status(500).json(err)
    }}