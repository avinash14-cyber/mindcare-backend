const cron = require("node-cron");
const Emotion = require("../model/emotionModel");

cron.schedule("55 23 * * *", async () => {
  console.log("Checking mood inactivity...");

  const records = await Emotion.find();

  const today = new Date();
  today.setHours(0,0,0,0);

  for (let record of records) {

    if (record.moods.length === 0) continue;

    const lastMood = record.moods[record.moods.length - 1];
    const lastMoodDate = new Date(lastMood.createdAt);

    if (lastMoodDate < today) {

      record.wellness = Math.max(record.wellness - 4, 0);

      await record.save();
    }
  }
});