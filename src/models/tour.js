import  mongoose  from "mongoose";


const tourSchema= new mongoose.Schema({

    title:String,
    description:String,
    seats:Number,
    price:Number,
    available:Number,
  
    image:[{
        type:String
    }],

    dateScheduled:Date,
    dueDate:Date,
    phone:String,
    tourDesciption:String,
    user: {
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
},

{
    timeStamps:true,
}

);
tourSchema.pre(/^find/,function(next){
    this.populate({path:"user",
select: "lastName email address"
});
    next();
})
const tour = mongoose.model('Tour',tourSchema);

export default tour;