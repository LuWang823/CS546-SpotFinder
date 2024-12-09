import mongoose from "mongoose";

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
  {
    timestamps: true,
  },
)

export default mongoose.model("Review", reviewSchema);