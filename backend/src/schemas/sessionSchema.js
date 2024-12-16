import z from "zod";
import xss from "xss";
// Rules for valid Session input data
export const CreateSessionSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "field 'email' is required" })
      .email({ message: "invalid email or password" })
      .transform((email) => xss(email)),
    password: z
      .string({ required_error: "field 'password' is required" })
      .min(6, { message: "invalid email or password" })
      .transform((password)=>xss(password)),
  }),
});
