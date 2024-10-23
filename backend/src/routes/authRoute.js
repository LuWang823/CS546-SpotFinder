import express from "express";
import validateResource from "../middlewares/validateResource.js";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/authController.js";
import { CreateSessionSchema } from "../schemas/sessionSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/",
  validateResource(CreateSessionSchema),
  createSessionHandler,
);
authRouter.get("/refresh", refreshAccessTokenHandler);

export default authRouter;
