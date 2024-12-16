import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    creater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spots: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Spot",
        },
      ],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Collection", collectionSchema);
