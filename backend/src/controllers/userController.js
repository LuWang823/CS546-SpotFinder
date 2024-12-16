// User-related controller functions

import catchAsync from "../utils/catchAsync.js";
import { v4 as uuid } from "uuid";
import User from "../modules/userModule.js";
import Spot from "../modules/spotModule.js";
import Review from "../modules/reviewModule.js";
import {
  sendResetPasswordMail,
  sendVerificationMail,
} from "../utils/mailer.js";
import AppError from "../utils/appError.js";
import ApiFeatures from "../utils/apiFeatures.js";

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
  let user = await User.findById(res.locals.user._id)
    .populate("liked")
    .select("-password -verificationCode")
    .lean();

  const postedSpots = await Spot.find({ user: res.locals.user._id });
  console.log("Posted Spots:", postedSpots, "\n\n");
  user.postedSpots = postedSpots;

  const postedReviews = await Review.find({ user: res.locals.user._id });
  console.log("Posted Reviews:", postedReviews, "\n\n");
  user.postedReviews = postedReviews;

  console.log(user);
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

  user.liked.push(spot._id);
  user.save();

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const removeLikeSpotHandler = catchAsync(async (req, res, next) => {
  const spot = await Spot.findById(req.params.spotId);
  let user = await User.findById(res.locals.user._id).select(
    "-password -verificationCode",
  );

  if (!user) next(new AppError("please log in", 400));
  if (!spot) next(new AppError("Spot with given id does not exist", 400));

  if (user.liked && user.liked.includes(spot._id)) {
    user = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { liked: spot._id },
      },
      { new: true },
    );

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }

  next(new AppError("user don't have this spot in liked list", 400));
});

export const addFriendHandler = catchAsync(async (req, res, next) => {
  res.locals.user._id;
  const user = await User.findById(res.locals.user._id);

  if (!user) next(new AppError("invalid email id", 400));
  user.friend.push(req.params.id);
  await user.save();

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const findUser = catchAsync(async (req, res, _next) => {
  const promise = new ApiFeatures(User.find(), req.query)
    .searchByName()
    .searchByHobby()
    .sort()
    .pagination()
    .limitFields().queryPromise;

  const users = await promise;
  return res.status(200).json({
    status: "success",
    data: users,
    count: users.length,
  });
});

export const sendFriendRequest = catchAsync(async (req, res, next) => {
  const sender = await User.findByIdAndUpdate(res.locals.user._id);
  const receiver = await User.findByIdAndUpdate(req.params.id);

  for (let friendReq of sender.requestSent) {
    if (String(friendReq.to_id) === receiver.id) {
      return res.status(200).json({
        status: "success",
        data: { sender },
      });
    }
  }

  const key = uuid();
  sender.requestSent.push({
    to_name: receiver.name,
    to_id: receiver._id,
    key,
    status: "pending",
  });
  receiver.requestReceived.push({
    sender_name: sender.name,
    sender_id: sender._id,
    key,
    status: "pending",
  });

  await sender.save();
  await receiver.save();

  return res.status(200).json({
    status: "success",
    data: { sender },
  });
});

export const acceptFriendRequest = catchAsync(async (req, res, next) => {
  if (res.locals.user._id === req.body.sender) {
    return next(new AppError("can not send yourself a request"));
  }
  const user = await User.findByIdAndUpdate(res.locals.user._id);
  const sender = await User.findByIdAndUpdate(req.body.sender);
  const key = req.body.key;
  let valid = false;

  for (let i = 0; i < user.requestReceived.length; i++) {
    if (user.requestReceived[i].key === key) {
      if (user.requestReceived[i].status !== "pending") {
        return next(new AppError("could not accept request"));
      }
      user.requestReceived[i].status = "accepted";
      user.friend.push(sender._id);
      await user.save();
      valid = true;
      break;
    }
  }

  for (let i = 0; i < sender.requestSent.length; i++) {
    if (sender.requestSent[i].key === key) {
      sender.requestSent[i].status = "accepted";
      sender.friend.push(user._id);
      await user.save();
      break;
    }
  }

  if (valid) {
    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } else {
    return next(new AppError("could not accept request"));
  }
});

export const rejectFriendRequest = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(res.locals.user._id);
  const sender = await User.findByIdAndUpdate(req.body.sender);
  const key = req.body.key;
  let valid = false;

  for (let i = 0; i < user.requestReceived.length; i++) {
    if (user.requestReceived[i].key === key) {
      if (user.requestReceived[i].status !== "pending") {
        return next(new AppError("cound not reject request"));
      }
      user.requestReceived[i].status = "rejected";
      await user.save();
      valid = true;
      break;
    }
  }

  for (let i = 0; i < sender.requestSent.length; i++) {
    if (sender.requestSent[i].key === key) {
      sender.requestSent[i].status = "rejected";
      await user.save();
      break;
    }
  }

  if (valid) {
    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } else {
    return next(new AppError("could not reject request"));
  }
});
