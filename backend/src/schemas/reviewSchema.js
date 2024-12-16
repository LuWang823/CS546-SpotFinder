import mongoose from "mongoose";
import z from "zod";
import xss from "xss";
const Body = z
  .object({
    spot: z.string().transform((spot) => xss(spot)),
    user: z.string().transform((user) => xss(user)),
    username: z.string().transform((username) => xss(username)),
    description: z.string().max(100).transform((description) => xss(description)),
    ratings: z.number().min(1).max(5),
  })
  .refine(
    (data) =>
      mongoose.isValidObjectId(data.spot) &&
      mongoose.isValidObjectId(data.user),
  );

export const CreateReviewSchema = z.object({
  body: Body,
});

export const GetAllReviewsSchema = z.object({
  params: z
    .object({
      spotId: z.string().transform((spotId) => xss(spotId)),
    })
    .refine((data) => mongoose.isValidObjectId(data.spotId)),
});

export const GetReviewsByIdSchema = z.object({
  params: z
    .object({
      id: z.string().transform((id) => xss(id)),
    })
    .refine((data) => mongoose.isValidObjectId(data.id)),
});
