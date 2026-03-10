const Appo = require('../model/appointmentsModel')
const Slot = require('../slotmodel/slotModel')
const mongoose = require('mongoose')
const Emotion=require('../model/emotionModel')
exports.deleteAppointmentController = async (req, res) => {

    const session = await mongoose.startSession()

    try {

        session.startTransaction()

        const { hour, minute, date } = req.body

        await Appo.deleteOne(
            {
                patientId: req.userID,
                status: "BOOKED"
            },
            { session }
        )

        await Slot.deleteOne(
            {
                date: new Date(date),
                hour,
                minute,
                isAvailable: false
            },
            { session }
        )

      let emotion = await Emotion.findOne({ patientID: req.userID }).session(session)

if (!emotion) {
  await Emotion.create([{
    patientID: req.userID,
    wellness: 45
  }], { session:session })
} else if (emotion.wellness > 5) {
  emotion.wellness -= 5
  await emotion.save({ session:session })
}

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json("completed")

    } catch (err) {

        await session.abortTransaction()
        session.endSession()

        return res.status(500).json(err)
    }
}