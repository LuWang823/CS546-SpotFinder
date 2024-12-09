// User Router for handling authentication and user management routes:

import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  likeSpotHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/userController.js";
import validateResource from "../middlewares/validateResource.js";
import {
  CreateUserSchema,
  ForgotPasswordSchema,
  LikeSpotSchema,
  ResetPasswordSchema,
  VerifyUserSchema,
} from "../schemas/userSchema.js";
import { userRequired } from "../middlewares/userRequired.js";
import { deserializeUser } from "../middlewares/deserializeUser.js";
import { uploadProfilePicture } from "../utils/uploadImage.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  uploadProfilePicture.single("user"),
  validateResource(CreateUserSchema),
  createUserHandler,
);

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

userRouter.patch(
  "/like/:spotId",
  deserializeUser,
  userRequired,
  validateResource(LikeSpotSchema),
  likeSpotHandler,
);

userRouter.get("/me", deserializeUser, userRequired, getCurrentUserHandler);

export default userRouter;
