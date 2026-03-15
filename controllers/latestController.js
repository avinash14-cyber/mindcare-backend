const emotion = require('../model/emotionModel')

exports.latestMoodController = async (req, res) => {

  try {

    const id = req.userID

    const result = await emotion.findOne({ patientID: id })

    const latestMood = result?.moods?.slice(-1)[0].emotion || null

    console.log(latestMood);
    
    return res.status(200).json(latestMood)

  } catch (err) {
    return res.status(500).json(err)
  }

}