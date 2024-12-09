import Review from "../modules/reviewModule.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createReview = catchAsync(async (req, res, _next) => {
    const createReview = await Review.create(req.body); 
    return res.status(200).json({
      status: "success",
      message: "Review created successfully",
      data: createReview
    });
  });


 export const getReview = catchAsync(async (req, res, _next) => {
    const { spot } = req.body
    const getReview = await Review.find({spot: spot}).toarray();
    if (!getReview) return next(new AppError("cound not get review", 400))
    return res.status(200).json({
      status: "success",
      message: "Review created successfully",
      data: getReview,
    });
  });


  export const updateReview = catchAsync(async (req, res, _next) => {
    const { _id } = req.params;
    if (!mongoose.isValidObjectId(_id)) return next(new AppError("invalid object ID", 400));
    const updateReview = await Review.findByIdAndUpdate(mongoose.Types.ObjectId(_id), req.body, options.timestamps=false);
    if (!updateReview) return next(new AppError("cound not update review", 400))
    return res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: updateReview,
    });
  });


  export const deleteReview = catchAsync(async (req, res, _next) => {
    const { _id } = req.params;
    if (!mongoose.isValidObjectId(_id)) return next(new AppError("invalid object ID", 400));

    const deletedReview = await Review.deleteOne({_id: mongoose.Types.ObjectId(_id)});
    if (!deletedReview) return next(new AppError("Could not delete review", 400));

    return res.status(200).json({
      status: "success",
      message: "Review has been deleted.",
    });
  });

