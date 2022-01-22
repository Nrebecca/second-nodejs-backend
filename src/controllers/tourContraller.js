import TourInfos from "../models/tour";


class TourController{
static async createTour(req, res) {
    req.body.user="req.user._id"
    const tour = await TourInfos.create(req.body)
    if(!tour) {
        return res.status(404).json({error:"tour not registered"});
    }
    return res 
    .status(200)
    .json({message:"tour created successfully",date:tour});

}
 
static async getAllTours(req, res) {
    const tours = await TourInfos.find();
    if(!tours) {
        return res.status(404).json({error: "tours not success retrieved"});
    }
    return res
    .status(200)
    .json({message:"successfully retrieved tours", data:tours});
}
 
static async getOneTour(req,res){
    const tour = await TourInfos.findById(req.params.id);
    if(!tour){
        return res.status(404).json({error:"tour not found"})
    }

return res
.status(200)
.json({message:"tour Found",data:tour});
}
static async deleteOneTour(req, res){
    const tour = await TourInfos.findByIdAndDelete(req.params.id);
    if(!tour){
        return res.status(404).json({error:"tour not found"})
}
return res
.status(200)
.json({message:"one tour deleted"});
}


}

export default TourController;