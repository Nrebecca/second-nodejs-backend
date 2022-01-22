import dotenv from "dotenv";



dotenv.config();

const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);

const sendSms = (userName,tourName,applicationStatus,applicationId,userphone)=>{
    client.messages.create({body:"hey "+userName+" your "+tourName+" booking tour "
    +applicationStatus+"RefId: "+applicationId,
  from:"+17069205362",
to:userphone}).then((message)=>console.log(message.sid))
}




export default sendSms;