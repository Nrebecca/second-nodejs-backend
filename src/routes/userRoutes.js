import express from "express";
import UserController from "../controllers/userController";
import Validator from "../middelwares/validator";
import DataChecker from "../middelwares/detachecker";
import verifyToken from "../middelwares/verifyToken";
import verifyAccess from "../middelwares/verifyAccess";


const userRouter = express.Router();
userRouter.post("/register",
Validator.newAccountRules(),
Validator.validateInput,
DataChecker.isEmailExist,
UserController.createUser);
userRouter.post("/login",UserController.userLogin)
userRouter.get("/all",UserController.getAllUsers)
userRouter.get("/:id",UserController.getOneUser)
userRouter.delete("/:id",UserController.deleteOneUser)

// booking path
userRouter.post("/book/:id",
verifyToken,
verifyAccess("user"),
UserController.bookTour);


userRouter.get("/book/all",
// verifyToken,
// verifyAccess("user"),
UserController.getBookedTours);
 
 
userRouter.get("/booked/:id",
 verifyToken, verifyAccess("admin"),
 UserController.getAllBookedByTourId);

 userRouter.get("/booked/me",
 verifyToken, verifyAccess("user"),
 UserController.getAllBookedByUserId);
//  update status

userRouter.patch("/booked/status",
 verifyToken, verifyAccess("admin"),
 UserController.changeBookstatus);

export default userRouter;
    
    





