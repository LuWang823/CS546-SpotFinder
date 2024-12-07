import mongoose from "mongoose";
import z from "zod";

export const VerifyReviewSchema = z.object({
    _id: z.instanceof(mongoose.ObjectId),
    spot: z.instanceof(mongoose.ObjectId),
    user: z.instanceof(mongoose.ObjectId),
    description: z.string(),
    ratings: z.number(),
  });