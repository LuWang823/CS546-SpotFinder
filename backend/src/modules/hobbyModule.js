import mongoose from "mongoose";

const globalUniqueHobbiesSchema = new mongoose.Schema(
    {
      hobbies: { type: [String], default: [] },
    },
    { timestamps: true }
  );

  
export default mongoose.model("HobbySet", globalUniqueHobbiesSchema);