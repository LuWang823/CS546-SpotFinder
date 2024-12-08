
import z from "zod";

const SpotBody = z.object({
    name: z.string({ required_error: "name is required" }).max(100),
    hobby: z
      .array(z.string())
      .nonempty({ message: "hobby is required" }),
    photo: z
      .string({ required_error: "photo is required" })
      .url("photo must be a valid URL"),
    description: z
      .string({ required_error: "description is required" })
      .max(500),
    location: z.object({
      type: z.literal("Point", { required_error: "field type must be a Point" }),
      coordinates: z
      .array(z.number(), { required_error: "field 'coordinates' is required" })
      .length(2, "field 'coordinates' must have exactly two values [longitude, latitude]"),
    }),
    reviews: z
      .array(z.string())
      .optional()
      .default([]),
    likes: z
      .array(z.string())
      .optional()
      .default([]),
  });

  

  export const CreateSpotSchema = z.object({
    body: SpotBody,
  });
  
  
