import { uploadSpotsImage } from "../utils/uploadImage.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const imageRequired = catchAsync(async (req, _res, next) => {
  req.body.image = req?.file?.path;
  if (!req?.body?.image) {
    next(new AppError("image is required"));
  }
  next();
});
