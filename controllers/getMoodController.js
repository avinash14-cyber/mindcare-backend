const emotions = require('../model/emotionModel')

exports.recentMoodController = async (req, res) => {

  try {

    const id = req.userID

    const result = await emotions.findOne({ patientID: id })

    const latestMoods = result?.moods?.slice(-3) || []

    return res.status(200).json(latestMoods)

  } catch (err) {
    res.status(500).json(err)
  }

}