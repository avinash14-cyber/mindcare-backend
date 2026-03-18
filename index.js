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

    socket.on("send_message",(data)=>{
        console.log("Message:",data)

        
        io.to(data.chatId).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })

})

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})