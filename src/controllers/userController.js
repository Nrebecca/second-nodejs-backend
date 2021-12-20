import UserInfos from"../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";

class UserController{
// create user in db
    static async createUser(req, res){
        const hashPassword = await bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword
        const user =await UserInfos.create(req.body);
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
}





export default UserController;