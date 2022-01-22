import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  user:{
      type:mongoose.Schema.ObjectId,
      ref:"User"
  },
  tour:{
    type:mongoose.Schema.ObjectId,
    ref:"Tour"  
  },
  status:{
      type:String,
      enum:["pending","accepted","cancel"],
      default:"pending"
  },
  } ,
  {
      timeStamps: true,
    }
  
);
bookSchema.pre(/^find/,function(next){
    this.populate({path:"user",
select: "lastName lastName email address gender address"

}).populate({
    path:"tour",
}),
    next();
})
const book = mongoose.model("Book",bookSchema);


export default book;
