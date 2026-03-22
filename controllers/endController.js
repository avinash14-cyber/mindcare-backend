const doc = require('../doctormodel/doctorauthModel')
const appo=require('../model/appointmentsModel')
const messages=require('../model/messageModel')


exports.endSessionController = async (req, res) => {
  try {
    const { patientid } = req.params
    const docid = req.userID

    const updatedAppointment = await appo.findOneAndUpdate(
      {
        patientId: patientid,
        doctorId: docid,
        status: "BOOKED"
      },
      {
        $set: { status: "ATTENDED" }
      },
      { new: true }
    )

    
    if (!updatedAppointment) {
      return res.status(404).json("No active session found")
    }
  

    await messages.deleteMany({
      chatId: `${docid}_${patientid}`
    })
    io.to(`${docid}_${patientid}`).emit("session_ended")

    return res.status(200).json("Session ended successfully")

  } catch (error) {
    console.error("Error ending session:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}