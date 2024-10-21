import catchAsync from "../utils/catchAsync.js";
import { v4 as uuid } from "uuid";
import User from "../modules/userModule.js";
import {
  sendResetPasswordMail,
  sendVerificationMail,
} from "../utils/mailer.js";
import AppError from "../utils/appError.js";

export const createUserHandler = catchAsync(async (req, res, _next) => {
  const user = await User.create(req.body);

  await sendVerificationMail({
    id: user.id,
    email: user.email,
    verificationCode: user.verificationCode,
  });

  res.status(200).json({
    status: "success",
    message: "user created successfully",
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
  const { email } = req.body;
  const message = `Password reset link will be send to email:${email} if it is a verified email address.`;

  const user = await User.findOne({ email });

  if (!user) {
    console.error(`User with email:${email} does not exists`);
    return res.send(message);
  }

  const resetPasswordCode = uuid();

  user.resetPasswordCode = resetPasswordCode;
  await user.save();

  sendResetPasswordMail({
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
