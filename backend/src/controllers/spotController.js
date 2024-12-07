import Spot from "../modules/spotModule";

export const createSpotHandler = catchAsync(async (req, res, _next) => {
    const createSpot = await Spot.create(req.body);
  
    res.status(200).json({
      status: "success",
      message: "Spot created successfully"
    });
  });