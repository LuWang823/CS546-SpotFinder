import express from "express";
import userRouter from "./userRoute.js";
import globalErrorHandler from "../controllers/errorController.js";

const app = express();

app.use(express.json());
app.use("/api/v1/users", userRouter);

app.use("*", globalErrorHandler);

export default app;
