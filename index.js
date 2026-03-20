require('dotenv').config()
require('./databaseConnection')
require('./cronjobs/cronUpdater');
require('./cronjobs/wellnessUpdate')
const express =require('express')
const cors=require('cors')
const route=require('./routes')
const mindcareServer=express()
const http = require('http')
const { Server } = require('socket.io')
mindcareServer.use(cors())
mindcareServer.use(express.json())
mindcareServer.use(route)
const messages=require('./model/messageModel')
const PORT=4000|| process.env.PORT

const server = http.createServer(mindcareServer)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{

    console.log("User connected:",socket.id)

    
    socket.on("join_chat",(chatId)=>{
        socket.join(chatId)
        console.log(`User joined room: ${chatId}`)
    })

    socket.on("send_message",async(data)=>{
        console.log("Message:",data)

        
         const newMessage = await messages.create({
    chatId: data.chatId,
    senderId: data.senderID,
    receiversId: data.receiversID,
    
    text: data.text
  })


        io.to(data.chatId).emit("receive_message",newMessage)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })

})

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})