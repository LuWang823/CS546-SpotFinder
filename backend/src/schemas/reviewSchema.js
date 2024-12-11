import z from "zod";

// <<<<<<< HEAD
// export const VerifyReviewSchema = z.object({
//     _id: z.string(),
//     spot: z.string(),
//     user: z.string(),
//     description: z.string(),
//     ratings: z.number(),
//   });
// =======
const Body = z
  .object({
    spot: z.string(),
    user: z.string(),
    description: z.string().max(100),
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
      spotId: z.string(),
    })
    .refine((data) => mongoose.isValidObjectId(data.spotId)),
});

export const GetReviewsByIdSchema = z.object({
  params: z
    .object({
      id: z.string(),
    })
    .refine((data) => mongoose.isValidObjectId(data.id)),
});
// >>>>>>> main
