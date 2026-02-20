
const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        contact:{
            type:String,
            required:true
        },
        emergency:{
            type:String,
            required:true
        }
    }
)

const users=mongoose.model('user_list',userSchema)
module.exports=users