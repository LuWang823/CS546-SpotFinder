/**
 * User Router for handling authentication and user management routes:
 * - POST /: Creates a new user with validation.
 * - POST /verify/:id/:verificationCode: Verifies a user using an ID and verification code with validation.
 * - POST /forgotPassword: Initiates the password recovery process with validation.
 * - POST /resetPassword/:id/:resetPasswordCode: Resets a user's password using an ID and reset code with validation.
 * - Each route uses the validateResource middleware to enforce schema validation before handling the request.
 */

import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/userController.js";
import validateResource from "../middlewares/validateResource.js";
import {
  CreateUserSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyUserSchema,
} from "../schemas/userSchema.js";
import { userRequired } from "../middlewares/userRequired.js";

const userRouter = express.Router();

userRouter.post("/", validateResource(CreateUserSchema), createUserHandler);
userRouter.post(
  "/verify/:id/:verificationCode",
  validateResource(VerifyUserSchema),
  verifyUserHandler,
);
userRouter.post(
  "/forgotPassword",
  validateResource(ForgotPasswordSchema),
  forgotPasswordHandler,
);
userRouter.post(
  "/resetPassword/:id/:resetPasswordCode",
  validateResource(ResetPasswordSchema),
  resetPasswordHandler,
);
userRouter.get("/me", userRequired, getCurrentUserHandler);

export default userRouter;
