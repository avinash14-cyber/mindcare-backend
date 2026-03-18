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
const latestAppointController=require('./controllers/followupController')
const followDateController=require('./controllers/followDateController')
const showAppoController=require('./controllers/showAppoController')
const deleteAppoController=require('./controllers/deleteAppoController')
const appolistController=require('./doctorcontroller/appolistController')
const riskController=require('./doctorcontroller/riskController')
const totalController=require('./doctorcontroller/totalController')
const wellnessController=require('./controllers/wellnessController')
const breathController=require('./controllers/breathController')
const latestController=require('./controllers/latestController')
const idController=require('./doctorcontroller/idController')
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

// follow up

route.get('/follow_up',jwtMiddleware,latestAppointController.followAppointController)

// follow up time

route.post('/followup_date',followDateController.followUpController)

// show appo

route.get('/show_appointment',jwtMiddleware,showAppoController.showApoointmentController)

// delete appointment

route.post('/delete_appoointment',jwtMiddleware,deleteAppoController.deleteAppointmentController)

// get doc appointments

route.get('/doc_appointments',docMiddleware,appolistController.getAppointmentController)

// risk patients

route.get('/risk_patients',docMiddleware,riskController.patientRiskController)

// total patients

route.get('/total_patients',docMiddleware,totalController.totalPatientController)

// wellness score

route.get('/wellness_score',jwtMiddleware,wellnessController.getwellnessController)

// breathing points
route.post('/breathing_points',jwtMiddleware,breathController.breathingPointsController)

// get latest mood
route.get('/latest_mood',jwtMiddleware,latestController.latestMoodController)

// get all id
route.get('/get_all_id',docMiddleware,idController.allIdController)