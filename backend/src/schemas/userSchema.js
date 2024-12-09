import mongoose from "mongoose";
import z from "zod";

// Rules for valid user input data
const Body = z.object({
  name: z.string({ required_error: "field 'name' is required" }).max(50),
  email: z
    .string({ required_error: "field 'email' is required" })
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "field 'password' is required" })
    .min(6, { message: "password must contain at least six character" }),
  image: z.string().optional(),
  address: z.string().optional(),
});

const Params = z.object({
  id: z.string({ required_error: "parameter 'id' is required" }),
});

export const CreateUserSchema = z.object({
  body: Body,
});

export const UpdateUserSchema = z.object({
  body: Body.omit({ password: true }).deepPartial(),
  params: Params,
});

export const VerifyUserSchema = z.object({
  params: z
    .object({
      id: z.string({ required_error: "parameter 'id' is required" }),
      verificationCode: z.string({
        required_error: "parameter 'verificationCode' is required",
      }),
    })
    .refine((data) => mongoose.isValidObjectId(data.id)),
});

export const ForgotPasswordSchema = z.object({
  body: Body.pick({ email: true }),
});

export const ResetPasswordSchema = z.object({
  body: Body.pick({ password: true }),
  params: z
    .object({
      id: z.string({ required_error: "parameter 'id' is required" }),
      resetPasswordCode: z.string({
        required_error: "parameter 'resetPasswordCode' is required",
      }),
    })
    .refine((data) => mongoose.isValidObjectId(data.id)),
});

export const LikeSpotSchema = z.object({
  params: z
    .object({
      spotId: z.string({ required_error: "parameter 'id' is required" }),
    })
    .refine((data) => mongoose.isValidObjectId(data.spotId)),
});
