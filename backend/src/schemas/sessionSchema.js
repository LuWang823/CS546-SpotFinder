import z from "zod";

export const CreateSessionSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "field 'email' is required" })
      .email({ message: "invalid email or password" }),
    password: z
      .string({ required_error: "field 'password' is required" })
      .min(6, { message: "invalid email or password" }),
  }),
});
