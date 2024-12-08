import express from "express";
const spotRouter = express.Router();
import { CreateSpotSchema } from "../schemas/spotSchema.js";
import { createSpotHandler } from "../controllers/spotController.js";
import validateResource from "../middlewares/validateResource.js";

spotRouter.post("/",validateResource(CreateSpotSchema),createSpotHandler);

export default spotRouter;