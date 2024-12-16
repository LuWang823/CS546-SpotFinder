// User Router for handling authentication and user management routes:

import express from "express";
import {
  acceptFriendRequest,
  addFriendHandler,
  createUserHandler,
  findUser,
  forgotPasswordHandler,
  getCurrentUserHandler,
  getUserById,
  likeSpotHandler,
  rejectFriendRequest,
  removeLikeSpotHandler,
  resetPasswordHandler,
  sendFriendRequest,
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
userRouter.get(
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

userRouter.delete(
  "/like/:spotId",
  deserializeUser,
  userRequired,
  validateResource(LikeSpotSchema),
  removeLikeSpotHandler,
);

userRouter.get("/me", deserializeUser, userRequired, getCurrentUserHandler);

// userRouter.patch("/:id", deserializeUser, userRequired, addFriendHandler);
userRouter.get("/", findUser);
userRouter.patch(
  "/sendFriendRequest/:id",
  deserializeUser,
  userRequired,
  sendFriendRequest,
);
userRouter.patch(
  "/acceptFriendRequest",
  deserializeUser,
  userRequired,
  acceptFriendRequest,
);
userRouter.patch(
  "/rejectFriendRequest",
  deserializeUser,
  userRequired,
  rejectFriendRequest,
);

userRouter.get("/getUserById/:id", getUserById);
export default userRouter;
