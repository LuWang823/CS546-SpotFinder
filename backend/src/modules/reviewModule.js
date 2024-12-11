import mongoose from "mongoose";

<<<<<<< HEAD
const reviewSchema =new mongoose.Schema(
{
    spot: {
        type: String,
        ref: "spot",
        required: true,
      },
    user: {
        type:  String,
        ref: "user",
        required: true,
      },
    description:{
        type: String, 
        ref: "description",
        required: true, 
    },
    ratings: {
        type: Number,
        ref: "ratings",
        required: true,
      },
},
=======
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
>>>>>>> main
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
