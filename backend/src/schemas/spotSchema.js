import z from "zod";
import mongoose from "mongoose";

const Body = z
  .object({
    name: z.string({ required_error: "name is required" }).max(20),
    hobby: z.array(z.string()).nonempty({ message: "hobby is required" }),
    image: z.string({ required_error: "image is required" }),
    description: z
      .string({ required_error: "description is required" })
      .max(500),
    location: z.object({
      coordinates: z
        .array(z.number(), {
          required_error: "field 'coordinates' is required",
        })
        .length(
          2,
          "field 'coordinates' must have exactly two values [longitude, latitude]",
        ),
    }),
  })
  .refine((data) => {
    if (
      data.location.coordinates[0] === Infinity ||
      data.location.coordinates[1] === Infinity
    )
      return false;

    if (
      isNaN(data.location.coordinates[0]) ||
      isNaN(data.location.coordinates[1])
    )
      return false;

    return true;
  });

const Params = z
  .object({
    id: z.string({ required_error: "parameter 'id' is required" }),
  })
  .refine((data) => mongoose.isValidObjectId(data.id));

export const CreateSpotSchema = z.object({
  body: Body,
});

export const GetSpotSchema = z.object({
  params: Params,
});

export const GetSpotsWithIn = z.object({
  body: z.object({
    x: z.number({ required_error: "x (longitude) is required" }),
    y: z.number({ required_error: "y (latitude) is required" }),
    r: z.number({ required_error: "r (distance in miles) is required" }),
  }),
});
