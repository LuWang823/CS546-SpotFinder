// Main application configuration file.

import express from "express";
import userRouter from "./userRoute.js";
import globalErrorHandler from "../controllers/errorController.js";
import authRouter from "./authRoute.js";
import AppError from "../utils/appError.js";
import mainRouter from "./mainRoute.js";
import spotRouter from "./spotRoute.js";
import exphbs from "express-handlebars";
import reviewRouter from "./reviewRoute.js";
import hobbyRouter from "./hobbyRoute.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/", mainRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", authRouter);
app.use("/api/v1/spots", spotRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/hobbies", hobbyRouter);
app.use("/api/v1/collections", collectionRouter);

//set rendering engine to handlebars
app.set("view engine", "handlebars");

//set default handlebars layout directory
import path from "path";
import { fileURLToPath } from "url";
import collectionRouter from "./collectionRoute.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("views", path.join(__dirname, "../../../frontend/views"));
app.set("layoutsDir", path.join(__dirname, "../../../frontend/views/layouts"));

//specify public folder
app.use(express.static(path.join(__dirname, "../../../frontend/public")));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.use("*", (req, _res, next) => {
  next(new AppError(`could not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
