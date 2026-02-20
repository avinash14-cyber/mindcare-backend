const emotions = require('../model/emotionModel')

exports.MoodDetailController = async (req, res) => {
  try {
    const id = req.userID
    const { emotion, influence, comments } = req.body

    const result = await emotions.findOne({ patientID: id })

    const newMood = {
      emotion: emotion,
      influencers: Array.isArray(influence) ? influence : []
    }

    if (result) {
      
      if (result.moods.length >= 7) {
        result.moods.shift()
      }

      result.moods.push(newMood)

      
      if (comments !== undefined) {
        result.comments = comments
      }

      await result.save()
      return res.status(200).json("Emotion updated")
    } 
    else {
      const emoModel = new emotions({
        patientID: id,
        moods: [newMood],
        comments: comments || ""
      })

      await emoModel.save()
      return res.status(201).json("Updated successfully")
    }

  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}
