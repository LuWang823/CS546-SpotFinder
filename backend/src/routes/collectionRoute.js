import express from "express";
import validateResource from "../middlewares/validateResource.js";
import { userRequired } from "../middlewares/userRequired.js";
import { deserializeUser } from "../middlewares/deserializeUser.js";
import {
  createCollectionHandler,
  getMyCollectionHandler,
  getSharedCollectionHandler,
} from "../controllers/collectionController.js";

const collectionRouter = express.Router();

collectionRouter.post(
  "/",
  deserializeUser,
  userRequired,
  createCollectionHandler,
);

collectionRouter.get(
  "/myCollections",
  deserializeUser,
  userRequired,
  getMyCollectionHandler,
);
collectionRouter.get(
  "/sharedCollections",
  deserializeUser,
  userRequired,
  getSharedCollectionHandler,
);

export default collectionRouter;
