import express from "express";
const spotRouter = express.Router();
import {
  CreateSpotSchema,
  GetSpotSchema,
  GetSpotsWithIn,
  UpdateSpotSchema,
  getSpotById,
} from "../schemas/spotSchema.js";
import {
  createSpotHandler,
  getAllSpotsHandler,
  getSpotHandler,
  getSpotsWithin,
  findSpotById,
  updateSpotHandler,
} from "../controllers/spotController.js";
import validateResource from "../middlewares/validateResource.js";
import { checkImage, imageRequired } from "../middlewares/imageRequired.js";
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
spotRouter.patch(
  "/:id",
  deserializeUser,
  userRequired,
  uploadSpotsImage.single("spot"),
  checkImage,
  validateResource(UpdateSpotSchema),
  updateSpotHandler
);
spotRouter.get("/within", validateResource(GetSpotsWithIn), getSpotsWithin);
// spotRouter.get("/:id", validateResource(GetSpotSchema), getSpotHandler);
spotRouter.get("/", getAllSpotsHandler);
spotRouter.get("/:id", validateResource(getSpotById), findSpotById);
export default spotRouter;
