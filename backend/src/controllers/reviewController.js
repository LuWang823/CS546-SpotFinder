import Review from "../modules/reviewModule.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Spot from "../modules/spotModule.js";
import xss from "xss";

export const createReview = catchAsync(async (req, res, _next) => {
  req.body.user = xss(req.body.user);
  req.body.spot = xss(req.body.spot);

  if (req.body.description) req.body.description = xss(req.body.description);
  if (req.body.ratings) req.body.ratings = xss(req.body.ratings);

  const existingReview = await Review.findOne({
    user: req.body.user,
    spot: req.body.spot,
  });
  if (existingReview) {
    return res.status(400).json({ message: "User already made a comment" });
  }
  const review = await Review.create(req.body);
  const reviewsOfSpot = await Review.find({ spot: req.body.spot });
  let ratingsAvg = 0;
  const ratingsTotal = reviewsOfSpot.length;
  if (ratingsTotal > 0) {
    // Calculate the average rating
    reviewsOfSpot.forEach((review) => {
      ratingsAvg += review.ratings;
    });
    ratingsAvg = ratingsAvg / ratingsTotal;

    // Update the spot with the new ratings
    try {
      await Spot.updateOne(
        { _id: req.body.spot }, // The condition to find the document
        { $set: { ratingsAvg: ratingsAvg, ratingsTotal: ratingsTotal } }, // The fields you want to update
      );
    } catch (err) {
      return res.status(400).json({ message: "Error updating spot ratings" });
    }
  }
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
