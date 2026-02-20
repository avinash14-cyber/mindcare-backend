require('dotenv').config()
require('./databaseConnection')
const express =require('express')
const cors=require('cors')
const route=require('./routes')
const mindcareServer=express()
mindcareServer.use(cors())
mindcareServer.use(express.json())
mindcareServer.use(route)

const PORT=4000|| process.env.PORT

mindcareServer.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})