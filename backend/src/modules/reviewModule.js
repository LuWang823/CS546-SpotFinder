import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    spot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spot",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate("spot").populate({
    path: "user",
    select: "-password -verificationCode",
  });
  next();
});

export default mongoose.model("Review", reviewSchema);
