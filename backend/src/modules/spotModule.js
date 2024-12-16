import mongoose from "mongoose";
import globalUniqueHobbies from "./hobbyModule.js";

const spotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hobby: { type: [String], required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
      },
    },
    ratingsAvg: { type: Number, default: 3, min: 1, max: 5 },
    ratingsTotal: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

spotSchema.index({ location: "2dsphere" });

spotSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password -verificationCode",
  });
  next();
});

async function updateGlobalHobbies(newHobbies) {
  const updatedDocument = await globalUniqueHobbies.findOneAndUpdate(
    {}, // Find the document
    { $addToSet: { hobbies: { $each: newHobbies } } }, // Add new hobbies to the set
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  return globalUniqueHobbies;
}

spotSchema.post("save", async function () {
  await updateGlobalHobbies(this.hobby); // Pass the hobby array from the new spot
});

export default mongoose.model("Spot", spotSchema);
