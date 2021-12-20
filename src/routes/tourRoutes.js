import express from "express";
import TourController from "../controllers/tourContraller"
import tour from "../models/tour";
import Validator from "../middelwares/validator";
import verifyAccess from "../middelwares/verifyAccess";
import verifyToken from "../middelwares/verifyToken";

const tourRouter=express.Router();
tourRouter.post("/create",verifyToken,verifyAccess("admin"),
Validator.newTourAccountRules(),
Validator.validateInput,
TourController.createTour
);
tourRouter.get("/Alltours",TourController.getAllTours);
tourRouter.get("/:id",TourController.getOneTour);
tourRouter.delete("/:id",TourController.deleteOneTour);



export default tourRouter;