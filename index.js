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


const onlineUsers = new Map() 

io.on("connection", (socket) => {

  console.log("User connected:", socket.id)

  // 🟢 USER ONLINE
  socket.on("user_online", (userId) => {
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set())
    }

    onlineUsers.get(userId).add(socket.id)

    io.emit("user_status", {
      userId,
      status: "online"
    })
  })

  // 🔍 CHECK ONLINE STATUS (for initial load)
  socket.on("check_online", (userId) => {
    const isOnline = onlineUsers.has(userId)

    socket.emit("user_status", {
      userId,
      status: isOnline ? "online" : "offline"
    })
  })

  // 💬 JOIN CHAT ROOM
  socket.on("join_chat", (chatId) => {
    socket.join(chatId)
    console.log(`User joined room: ${chatId}`)
  })

  // 🚪 LEAVE CHAT ROOM
  socket.on("leaveRoom", (chatId) => {
    socket.leave(chatId)
    console.log(`User left room: ${chatId}`)
  })

  // 📩 SEND MESSAGE
  socket.on("send_message", async (data) => {
    try {
      console.log("Message:", data)

      const newMessage = await messages.create({
        chatId: data.chatId,
        senderId: data.senderID,
        receiversId: data.receiversID,
        text: data.text
      })

      io.to(data.chatId).emit("receive_message", newMessage)

    } catch (err) {
      console.error("Message error:", err)
    }
  })

  
  socket.on("disconnect", () => {
    for (let [userId, sockets] of onlineUsers.entries()) {

      if (sockets.has(socket.id)) {
        sockets.delete(socket.id)

       
        if (sockets.size === 0) {
          onlineUsers.delete(userId)

          io.emit("user_status", {
            userId,
            status: "offline"
          })
        }

        break
      }
    }

    console.log("User disconnected:", socket.id)
  })

})
server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})