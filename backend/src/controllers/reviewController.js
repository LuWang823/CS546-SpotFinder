import Review from "../modules/reviewModule.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createReview = catchAsync(async (req, res, _next) => {
  const review = await Review.create(req.body);
  return res.status(200).json({
    status: "success",
    data: review,
  });
});

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ spot: req.params.spotId });
  return res.status(200).json({
    status: "success",
    data: reviews,
    count: reviews.length,
  });
});

export const getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  return res.status(200).json({
    status: "success",
    data: review,
  });
});

export const updateReview = catchAsync(async (req, res, _next) => {
  const { _id } = req.params;
  if (!mongoose.isValidObjectId(_id))
    return next(new AppError("invalid object ID", 400));
  const updateReview = await Review.findByIdAndUpdate(
    mongoose.Types.ObjectId(_id),
    req.body,
    (options.timestamps = false),
  );
  if (!updateReview) return next(new AppError("cound not update review", 400));
  return res.status(200).json({
    status: "success",
    message: "Review updated successfully",
    data: updateReview,
  });
});

export const deleteReview = catchAsync(async (req, res, _next) => {
  const { _id } = req.params;
  if (!mongoose.isValidObjectId(_id))
    return next(new AppError("invalid object ID", 400));

  const deletedReview = await Review.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  if (!deletedReview) return next(new AppError("Could not delete review", 400));

  return res.status(200).json({
    status: "success",
    message: "Review has been deleted.",
  });
});
