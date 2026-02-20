const mongoose=require('mongoose')

const doctorSchema=mongoose.Schema(
    {
         name:{
            type:String,
            required:true
        },
        license:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        speciality:{
            type:String,
            required:true
        },
        exp:{
            type:String,
            required:true
        },
        slots:{
            type:Object,
            required:false
        }
    }
)

const doc=mongoose.model("doc_lists",doctorSchema)
module.exports=doc