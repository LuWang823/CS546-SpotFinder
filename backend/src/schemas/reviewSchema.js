import z from "zod";

export const VerifyReviewSchema = z.object({
    _id: z.string(),
    spot: z.string(),
    user: z.string(),
    description: z.string(),
    ratings: z.number(),
  });