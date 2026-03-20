const appo=require('../model/appointmentsModel')
const emotions=require('../model/emotionModel')
exports.totalPatientController=async(req,res)=>{

    try{
        const result=await appo.find({
            doctorId:req.userID,
            status:"BOOKED"
        }).select("date hour minute").populate("patientId","name" )

        await Promise.all(
    result.map(async (a) => {

        const emo = await emotions.findOne({ patientID: a.patientId })

        a._doc.wellness = emo?.wellness ?? null
        a._doc.moodstreak = emo?.moodstreak ?? null
        a._doc.lastmood = emo?.moods?.[emo?.moods?.length - 1]?.emotion ?? null

    })
)
       
        
        return res.status(200).json(result)
    }
    catch(err){
        return res.status(500).json(err)
    }
}