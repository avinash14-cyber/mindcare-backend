

var jwt=require('jsonwebtoken')
const users=require('../model/userModel')


exports.registerController=async(req,res)=>{
    const{name,email,password,contact,emergency}=req.body
    try{

        const existinguser=await users.findOne({email})
        if(existinguser){
          return  res.status(400).json("Already existing user" )
        }
        else{
            const newUser =new users({
                name,
                email,
                password,
                contact,
                emergency
            })
            await newUser.save()
           return res.status(200).json(newUser)   
        }
    }
    catch(err){
         
         return res.status(500).json(err)
    }
    
}


// login contoller

exports.loginController=async(req,res)=>{
    
    const {email,password}=req.body

    try{

        const existingUser=await users.findOne({email})
        if(existingUser){
            if(existingUser.password==password){

                const token=jwt.sign({userid:existingUser._id},process.env.jwt_secret,{expiresIn:'5h'})
                return res.status(200).json({existingUser:{
                   
                    
                    name:existingUser.name,
                    email:existingUser.email,
                },token})
            }
            else{
                return res.status(401).json('Incorrect password')
            }
        }    
        else{
            return res.status(404).json('No registered user please create an account')
        }

    }
    catch(err){
        return res.status(500).json(err)
    }
}