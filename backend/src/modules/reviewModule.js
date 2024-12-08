import mongoose from "mongoose";

const reviewSchema =new mongoose.Schema(
{
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "_id",
      },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "spot",
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    description:{
        type: String, required: true 
    },
    ratings: {
        type: Number,
        ref: "ratings",
      },
},
  {
    timestamps: true,
  },
)

export default mongoose.model("Review", reviewSchema);