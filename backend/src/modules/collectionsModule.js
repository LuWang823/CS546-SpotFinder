import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    creater_name: { type: String, required: true },
    creater_id: {
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
          spot: { type: mongoose.Schema.Types.ObjectId, ref: "Spot" },
          name: { type: String, required: true },
          _id: false,
        },
      ],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  {
    timestamps: true,
  },
);

collectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "spots",
  });
  next();
});
export default mongoose.model("Collection", collectionSchema);
