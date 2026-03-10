const emotions = require("../model/emotionModel")
const dayjs = require("dayjs");

const startOfDay = dayjs().startOf("day").toDate();
const endOfDay = dayjs().endOf("day").toDate();
exports.moodController = async (req, res) => {
  try {
    const id = req.userID
    const { emotion } = req.body

    const result = await emotions.findOne({ patientID: id })

    const newMood = {
      emotion: emotion,
      influencers: [],
      
    }

    if (result) {

      if (result.moods.length >= 7) {
        result.moods.shift() 
      }

      result.moods.push(newMood)
      const moodCountToday = result.moods.filter(
  mood => mood.createdAt >= startOfDay && mood.createdAt <= endOfDay
).length;

if (moodCountToday <=3 && result.wellness<=97) {
  result.wellness += 3;
}
      await result.save()

      return res.status(200).json("Emotion updated")
    } 
    else {
      const newPatient = new emotions({
        patientID: id,
        moods: [newMood],
        wellness:53
      })

      
      await newPatient.save()
      return res.status(201).json(newPatient)
    }

  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}
