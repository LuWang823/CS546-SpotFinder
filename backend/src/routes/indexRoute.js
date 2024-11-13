// Main application configuration file.

import express from "express";
import userRouter from "./userRoute.js";
import globalErrorHandler from "../controllers/errorController.js";
import authRouter from "./authRoute.js";
import AppError from "../utils/appError.js";

const app = express();

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", authRouter);

app.use("*", (req, _res, next) => {
  next(new AppError(`could not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
