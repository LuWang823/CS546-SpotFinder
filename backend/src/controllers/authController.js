// Controller functions for handling user sessions

import catchAsync from "../utils/catchAsync.js";
import _ from "lodash";
import User from "../modules/userModule.js";
import Session from "../modules/sessionModule.js";
import AppError from "../utils/appError.js";
import { signAccessToken, signRefreshToken, verifyJwt } from "../utils/jwt.js";
import xss from "xss";

export const createSessionHandler = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  email = xss(email);
  password = xss(password);

  email = email.toLowerCase();
  const message = "invalid email or password";

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError(message, 400));
  }

  if (!user.verified) {
    return next(new AppError("please verify your account", 400));
  }

  if (user.password && (await user.comparePasswords(password, user.password))) {
    const accessToken = await signAccessToken(user, [
      "password",
      "verificationCode",
      "resetPasswordCode",
      "verified",
      "__v",
    ]);

    const refreshToken = await signRefreshToken(user.id);

    return res.status(200).json({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  return next(new AppError(message, 400));
});

export const refreshAccessTokenHandler = catchAsync(async (req, res, next) => {
  let refreshToken = _.get(req, "headers.x-refresh");
  const message = "could not refresh access token";

  refreshToken = xss(refreshToken);

  if (!refreshToken) {
    return next(new AppError(message, 400));
  }

  const decoded = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded) {
    return next(new AppError(message, 400));
  }

  const session = await Session.findById(decoded.session);

  if (!session || !session.valid) {
    return next(new AppError(message, 400));
  }

  const user = await User.findById(session.user);

  if (user) {
    const accessToken = await signAccessToken(user, [
      "password",
      "verificationCode",
      "resetPasswordCode",
      "verified",
      "__v",
    ]);
    return res.status(200).json({
      status: "success",
      data: {
        accessToken,
      },
    });
  }

  return next(new AppError(message, 400));
});
