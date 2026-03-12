const cron = require("node-cron");
const Emotion = require("../model/emotionModel");

cron.schedule("55 23 * * *", async () => {
  console.log("Checking mood inactivity...");

  const records = await Emotion.find();

  const today = new Date();
  today.setHours(0,0,0,0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  for (let record of records) {

    if (record.moods.length === 0) continue;

    const lastMood = record.moods[record.moods.length - 1];
    const lastMoodDate = new Date(lastMood.createdAt);
    lastMoodDate.setHours(0,0,0,0);

    if (lastMoodDate.getTime() === yesterday.getTime()) {

      record.moodstreak += 1;

    } 
    else if (lastMoodDate.getTime() < yesterday.getTime()) {

      record.moodstreak = 0;
      record.wellness = Math.max(record.wellness - 4, 0);

    }

    await record.save();
  }
});