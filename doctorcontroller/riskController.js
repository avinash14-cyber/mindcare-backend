const appo = require('../model/appointmentsModel')
const emotions = require('../model/emotionModel')

exports.patientRiskController= async (req, res) => {

  try {

    const appointments = await appo.find({
      doctorId: req.userID,
      status: "BOOKED"
    })
    .select("hour minute session date patientId")
    .populate("patientId", "name")

    for (let a of appointments) {

      const emotion = await emotions.findOne({ patientID: a.patientId._id })

      a._doc.wellness = emotion?.wellness ?? null
    }

    return res.status(200).json(appointments)

  } catch (err) {
    return res.status(500).json(err)
  }

}