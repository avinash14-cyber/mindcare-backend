const express=require('express')
const userController=require('./controllers/userController')
const jwtMiddleware=require('./middlewares/jwtMiddleware')
const docMiddleware=require('./middlewares/doctorMiddleware')
const emotionController=require('./controllers/emotionController')
const emotionDetailController=require('./controllers/emotionDetailController')
const getMoodController=require('./controllers/getMoodController')
const getSlotController=require('./doctorcontroller/slotController')
const docController=require('./doctorcontroller/authContoller')
const patientChooseController=require('./doctorcontroller/chooseDocController')
const appointController=require('./controllers/appointController')
const route= new express.Router()

module.exports=route


// register route

route.post('/register',userController.registerController)

// login route

route.post('/login',userController.loginController)


// emotions update

route.post('/mood_update',jwtMiddleware,emotionController.moodController)

// emotion details

route.post('/mood_details',jwtMiddleware,emotionDetailController.MoodDetailController)

// // recent entries

route.get('/get_mood_details',jwtMiddleware,getMoodController.recentMoodController)

//   doc slot 

route.patch('/update_slot',docMiddleware,getSlotController.slotController)

// get doc slot

route.get('/get_update_slot',docMiddleware,getSlotController.fetchSlotController)

// delete slot

route.delete('/delete_slot',docMiddleware,getSlotController.deleteSlotController)

// doc register

route.post('/doc_register',docController.docAuthController)

// doc login

route.post('/doc_login',docController.docLoginController)

// choose doc

route.post('/choose_doc',patientChooseController.fetchdocController)

// book appointment

route.post('/book_appoinment',jwtMiddleware,appointController.appointmentController)