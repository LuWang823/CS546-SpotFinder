import Spot from "../modules/spotModule.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

export const createSpotHandler = catchAsync(async (req, res, _next) => {
  const createSpot = await Spot.create({
    ...req.body,
    user: res.locals.user._id,
  });

  return res.status(200).json({
    status: "success",
    data: createSpot,
  });
});

export const getSpotHandler = catchAsync(async (req, res, _next) => {
  const spot = await Spot.findById(req.params.id);

  return res.status(200).json({
    status: "success",
    data: spot,
  });
});

export const getAllSpotsHandler = catchAsync(async (req, res, _next) => {
  const promise = new ApiFeatures(Spot.find(), req.query)
    .filter()
    .searchByName()
    .searchByHobby()
    .sort()
    .pagination()
    .limitFields().queryPromise;

  const spots = await promise;
  return res.status(200).json({
    status: "success",
    data: spots,
    count: spots.length,
  });
});

export const getSpotsWithin = catchAsync(async (req, res, _next) => {
  const { x, y, r } = req.body;
  const spots = await Spot.find({
    location: { $geoWithin: { $centerSphere: [[x, y], r / 3963.2] } },
  });

  return res.status(200).json({
    status: "success",
    data: spots,
    count: spots.length,
  });
});


export const findSpotById = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    const spotFound = await Spot.findById(id);
  
    if (!spotFound) {
      return next(new AppError("Spot found", 400));
    }
  
    return res.status(200).json({
        message: "Spot found",
        data : spotFound
      });
});  