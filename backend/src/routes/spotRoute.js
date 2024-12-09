import express from "express";
const spotRouter = express.Router();
import { CreateSpotSchema } from "../schemas/spotSchema.js";
import { createSpotHandler } from "../controllers/spotController.js";
import validateResource from "../middlewares/validateResource.js";
import { getSpotById } from "../schemas/spotSchema.js";
import { findSpotById } from "../controllers/spotController.js";

spotRouter.post("/",validateResource(CreateSpotSchema),createSpotHandler);
spotRouter.get("/:id",validateResource(getSpotById),findSpotById);
export default spotRouter;