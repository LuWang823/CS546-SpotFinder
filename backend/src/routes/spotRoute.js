import express from "express";
const spotRouter = express.Router();
import {
  CreateSpotSchema,
  GetSpotSchema,
  GetSpotsWithIn,
  getSpotById
} from "../schemas/spotSchema.js";
import {
  createSpotHandler,
  getAllSpotsHandler,
  getSpotHandler,
  getSpotsWithin,
  findSpotById
} from "../controllers/spotController.js";
import validateResource from "../middlewares/validateResource.js";
import { imageRequired } from "../middlewares/imageRequired.js";
import { uploadSpotsImage } from "../utils/uploadImage.js";
import { deserializeUser } from "../middlewares/deserializeUser.js";
import { userRequired } from "../middlewares/userRequired.js";

spotRouter.post(
  "/",
  deserializeUser,
  userRequired,
  uploadSpotsImage.single("spot"),
  imageRequired,
  // validateResource(CreateSpotSchema),
  createSpotHandler,
);

spotRouter.get("/within", validateResource(GetSpotsWithIn), getSpotsWithin);
// spotRouter.get("/:id", validateResource(GetSpotSchema), getSpotHandler);
spotRouter.get("/", getAllSpotsHandler);
spotRouter.get("/:id",validateResource(getSpotById),findSpotById);
export default spotRouter;
