// User-related controller functions

import catchAsync from "../utils/catchAsync.js";
import { v4 as uuid } from "uuid";
import User from "../modules/userModule.js";
import Spot from "../modules/spotModule.js";
import {
  sendResetPasswordMail,
  sendVerificationMail,
} from "../utils/mailer.js";
import AppError from "../utils/appError.js";

export const createUserHandler = catchAsync(async (req, res, _next) => {
  req.body.email = req.body.email.toLowerCase();
  const user = await User.create(req.body);

  await sendVerificationMail({
    id: user.id,
    email: user.email,
    verificationCode: user.verificationCode,
  });

  res.status(200).json({
    status: "success",
    message: "user created successfully",
    code: user.verificationCode, //remove in prod
    id: user.id, //remove in prod
  });
});

export const verifyUserHandler = catchAsync(async (req, res, next) => {
  const { id, verificationCode } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("cound not verify user", 400));
  }

  if (user.verified) {
    return res.status(200).json({
      message: "user already verified",
    });
  }

  if (user.verificationCode && user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "user verified successfully",
    });
  }

  return next(new AppError("could not verify usr", 400));
});

export const forgotPasswordHandler = catchAsync(async (req, res, _next) => {
  let { email } = req.body;
  email = email.toLowerCase();
  const message = `Password reset link will be send to email:${email} if it is a verified email address.`;

  const user = await User.findOne({ email });

  if (!user) {
    console.error(`User with email:${email} does not exists`);
    return res.send(message);
  }

  const resetPasswordCode = uuid();

  user.resetPasswordCode = resetPasswordCode;
  await user.save();

  await sendResetPasswordMail({
    id: user.id,
    email: user.email,
    resetPasswordCode,
  });

  console.log(`password reset email sent to ${email}`);
  return res.send(message);
});

export const resetPasswordHandler = catchAsync(async (req, res, _next) => {
  const { password } = req.body;
  const { id, resetPasswordCode } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "cound not reset the password",
    });
  }

  if (user.resetPasswordCode && user.resetPasswordCode === resetPasswordCode) {
    user.password = password;
    user.resetPasswordCode = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "password reset successfully",
    });
  }

  return res.status(400).json({
    status: "fail",
    message: "could not reset the password",
  });
});

export const getCurrentUserHandler = catchAsync(async (_req, res, _next) => {
  const user = await User.findById(res.locals.user._id)
    .populate("liked")
    .select("-password -verificationCode");
  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const likeSpotHandler = catchAsync(async (req, res, next) => {
  const spot = await Spot.findById(req.params.spotId);
  let user = await User.findById(res.locals.user._id).select(
    "-password -verificationCode",
  );

  if (!user) next(new AppError("please log in", 400));
  if (!spot) next(new AppError("Spot with given id does not exist", 400));

  let likedSpots = user.liked;
  if (likedSpots && likedSpots.includes(spot._id)) {
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }

  if (!likedSpots) likedSpots = [];
  likedSpots.push(spot._id);

  user = await User.findByIdAndUpdate(
    user._id,
    { liked: likedSpots },
    { new: true },
  ).select("-password -verificationCode");

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
