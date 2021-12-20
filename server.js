import express from"express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes";
import tourRouter from "./src/routes/tourRoutes"; 
dotenv.config("./.env")
const app = express();
app.use(bodyParser.json());
app.use("/user",userRouter),
app.use("/tour",tourRouter),

app.use ("/",(req,res)=>res.status(200).json({
    message:"This is Tour Api"
}));
const dburl =process.env.DATABASEURL;
mongoose.connect(dburl,).then(()=>console.log("database connected successfully"))
app.listen(3030,()=>{
    console.log(`server is runing on port 3030`);
})
export default app;