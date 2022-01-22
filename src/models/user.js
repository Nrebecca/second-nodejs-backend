import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        
         phone:String,

        address:{
            type:String,
            default:"Rwanda",
            },

        gender:{
            type:String,
            enum:['male','female','other','no-say'],
        },

        role:{
            type:String,
            enum:["admin","user"],
            default:"user"

        }
    },
        {
            timestamps:true,
        }
        )

        const user = mongoose.model('User',userSchema)
       export default user;