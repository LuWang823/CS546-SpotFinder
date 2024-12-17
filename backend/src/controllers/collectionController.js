import xss from "xss";
import Collection from "../modules/collectionsModule.js";
import User from "../modules/userModule.js";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";
import Spot from "../modules/spotModule.js";
import AppError from "../utils/appError.js";

export const createCollectionHandler = catchAsync(async (req, res, next) => {
  const { spots, sharedWith } = req.body;
  const collection = await Collection.create({
    creater_name: res?.locals?.user?.name,
    creater_id: res?.locals?.user?._id,
    spots,
    sharedWith,
  });

  // const user_creater = await User.findById(res.locals.user._id);
  const user_sharedWith = await User.findById(sharedWith);

  // user_creater.collection.push(collection._id);
  if (!user_sharedWith) next(new AppError("user does not exist"));
  user_sharedWith.sharedCollection.push(collection._id);

  // await user_creater.save();
  await user_sharedWith.save();

  return res.status(200).json({
    status: "success",
    data: { collection },
  });
});

export const getMyCollectionHandler = catchAsync(async (_req, res, _next) => {
  const collections = await Collection.find({
    creater: res?.locals?.user?._id,
  });

  return res.status(200).json({
    status: "success",
    data: { collections },
  });
});

export const getSharedCollectionHandler = catchAsync(
  async (_req, res, _next) => {
    const user = await User.findById(res?.locals?.user?._id).populate(
      "sharedCollection",
    );

    return res.status(200).json({
      status: "success",
      data: { collections: user.sharedCollection },
    });
  },
);
