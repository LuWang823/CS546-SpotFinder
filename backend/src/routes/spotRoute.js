import express from "express";
const spotRouter = express.Router();
import { CreateSpotSchema } from "../schemas/spotSchema.js";
import { createSpotHandler } from "../controllers/spotController.js";

spotRouter.post("/",validateResource(CreateSpotSchema),createSpotHandler);