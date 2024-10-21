import AppError from "../utils/appError.js";

export const userRequired = (_req, res, next) => {
  const user = res.locals.user;
  if (user) {
    return next();
  }
  return next(new AppError("you are not logged in", 400));
};
