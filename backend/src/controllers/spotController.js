import Spot from "../modules/spotModule.js";
import catchAsync from "../utils/catchAsync.js";

export const createSpotHandler = catchAsync(async (req, res, _next) => {
    const createSpot = await Spot.create(req.body);
    
    return res.status(200).json({
      status: "success",
      message: "Spot created successfully",
      data: createSpot
    });
  });

export const findSpotById = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    const spotFound = await Spot.findById(id);
  
    if (!spotFound) {
      return next(new AppError("Spot found", 400));
    }
  
    return res.json({
        message: "Spot found",
        data : spotFound
      });
});  