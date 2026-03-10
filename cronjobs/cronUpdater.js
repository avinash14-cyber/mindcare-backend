const cron = require("node-cron");
const dayjs = require("dayjs");
const appo=require('../model/appointmentsModel')

cron.schedule("*/5 * * * *", async () => {
 
 console.log("🕒 Cron started at:", new Date().toLocaleTimeString());
  const endOfToday = dayjs().endOf("day").toDate();
  const now = dayjs();

  const appointments = await appo.find({
    status: "BOOKED",
    date: { $lte: endOfToday }
  });
 console.log("📄 Found appointments:", appointments.length);

  for (const app of appointments) {
    const start = dayjs(app.date)
      .hour(app.hour)
      .minute(app.minute)
      .second(0);

    const end = start.add(1, "hour");

    if (end.isBefore(now)) {
      await appo.updateOne(
        { _id: app._id },
        { $set: { status: "Not Attended" } }
      );
    }
    console.log("✅ Marked NO_SHOW for:", app._id);
  }
});