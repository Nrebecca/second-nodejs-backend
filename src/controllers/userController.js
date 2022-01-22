import UserInfos from"../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book"
import TourInfos from "../models/tour";
import sendSms from "../helpers/sendSms";
class UserController{
// create user in db
    static async createUser(req, res){
        const hashPassword = await bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword
        const user = await UserInfos.create(req.body);
        if(!user){
            return res.status(400).json({error:"user not registered"});
        }
        return res.status(200)
        .json({message:"user registered successfully", data: user})
    }
    // get all users
static async getAllUsers(req, res) {
  const users = await UserInfos.find();
  if (!users) {
    return res.status(404).json({ error: "users not success retrieved" });
  }
  return res
    .status(200)
    .json({ message: "successfully retrieved users", data: users });
}

// get one user
static async getOneUser(req, res) {
    const user = await UserInfos.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "User Found", data: user });
  }

//   delete one user
static async deleteOneUser(req, res) {
    const user = await UserInfos.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "one data deleted" });
  } 

 // login function
    static async userLogin (req,res){
        const user = await UserInfos.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({error:"user not found! kindly register first"});
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
          const token = TokenAuth.tokenGenerator({user:user});
          return res.status(200).json({message: "successfully logged in", token: token,data:user});

        }
return res.status(400).json({error:"invalid email or password"});



    }
    // booking functions
    static async bookTour(req,res){
      const bookData={
        user: req.user._id,
        tour:req.params.id,
         };
      const book = await BookInfos.create(bookData);
      const tour = await TourInfos.findById(req.params.id);
      const tourseats=tour.seats-1;
      await TourInfos.findByIdAndUpdate(req.params.id,{seats:tourseats});

      if(!book){
       return res.status(400).json({error:"failed to book"})

      } return res.status(200).json({message:"booked successfully",data:book})

      // allbooked tours
    }
    static async getBookedTours(req, res) {
      const bookedTour = await BookInfos.find();
      if(!bookedTour) {
          return res.status(404).json({error: "Booked tours are not found"});
      }
      return res
      .status(200)
      .json({message:"successfully retrieved booked tours", data:bookedTour
    });
  
  }
  static async getAllBookedByTourId(req,res){
const booked=await BookInfos.find({tour:req.params.idtour});
if(!booked){
  return res.status(404).json({error: "Booked not found"});
}
return res
.status(200)
.json({message:"successfully found", data:booked
});
  }

static async getAllBookedByUserId(req,res){
  const booked =await BookInfos.find({user:req.user._id});
  if(!booked){
    return res.status(404).json({error: "Booked not found"});
  }
  return res
  .status(200)
  .json({message:"successfully found", data:booked
  });
}
  
  static async changeBookstatus(req, res){
    const {id,status} =req.body;

    const book = await BookInfos.findByIdAndUpdate(id, {status: status}, {new: true})
    if(!book){
      return res.status(400).json({error:"failed to update status"}); 

  }

sendSms(book.user.firstName,book.tour.tourName,book.status,book._id,book.user.phone)
return res.status(200).json({message:"success", data:book});

  }
}




export default UserController;