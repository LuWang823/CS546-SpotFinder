import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUserHandler);
userRouter.post("/verify/:id/:verificationCode", verifyUserHandler);
userRouter.post("/forgotPassword", forgotPasswordHandler);
userRouter.post("/resetPassword/:id/:resetPasswordCode", resetPasswordHandler);

export default userRouter;
