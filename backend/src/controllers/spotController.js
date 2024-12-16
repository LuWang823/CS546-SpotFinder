import Spot from "../modules/spotModule.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../modules/reviewModule.js";
import AppError from "../utils/appError.js";
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
  console.log(spots.length);
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

export const findSpotPageById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  const spot = await Spot.findById(id);

  if (!spot) {
    return next(new AppError("Spot found", 400));
  }

  const reviews = await Review.find({ spot: req.params.spotId });

  if(spot.image){
    return res.status(200).render('spot', {
      title: spot.name,
      image_src: '/'+spot.image.replace(/\\/g, '/'),
      spotName: spot.name,
      tagList: spot.hobby,
      spotCoordinates: spot.location.coordinates,
      spotDescription: spot.description,
      avgRating: Math.round((spot.ratingsAvg) * 100) / 100,
      numRatings: spot.ratingsTotal,
      review: reviews
    });
  }else{
    return res.status(200).render('spot', {
      title: spot.name,
      image_src: '/uploads/spots/undefined.jpeg',
      spotName: spot.name,
      tagList: spot.hobby,
      spotCoordinates: spot.location.coordinates,
      spotDescription: spot.description,
      avgRating: Math.round((spot.ratingsAvg) * 100) / 100,
      numRatings: spot.ratingsTotal,
      review: reviews
    });
  }
  
}); 
export const updateSpotHandler = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const spot = await Spot.findById(id);

  if (!spot) {
    return next(new AppError("Spot found", 400));
  }
  console.log(res.locals.user._id + " " + spot.user.id);
  if(res.locals.user._id!= spot.user.id ){
    return next(new AppError("User doesnot match",400));
  }
  const updateSpot = await Spot.findByIdAndUpdate(id , req.body, { new: true });

  return res.status(200).json({
    status: "success",
    data: updateSpot,
  });
});