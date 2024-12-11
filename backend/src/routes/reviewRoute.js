<<<<<<< HEAD
// import express from "express";
// const reviewRouter = express.Router();
// import { CreateSpotSchema } from "../schemas/reviewSchema.js";
// import { createSpotHandler } from "../controllers/spotController.js";
// import validateResource from "../middlewares/validateResource.js";

// spotRouter.post("/",validateResource(CreateSpotSchema),createSpotHandler);

// export default spotRouter;
=======
import express from "express";
import validateResource from "../middlewares/validateResource.js";
import {
  createReview,
  getAllReviews,
  getReviewById,
} from "../controllers/reviewController.js";
import {
  CreateReviewSchema,
  GetAllReviewsSchema,
  GetReviewsByIdSchema,
} from "../schemas/reviewSchema.js";
import { deserializeUser } from "../middlewares/deserializeUser.js";
import { userRequired } from "../middlewares/userRequired.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/",
  deserializeUser,
  userRequired,
  validateResource(CreateReviewSchema),
  createReview,
);

reviewRouter.get(
  "/spots/:spotId",
  validateResource(GetAllReviewsSchema),
  getAllReviews,
);

reviewRouter.get("/:id", validateResource(GetReviewsByIdSchema), getReviewById);
export default reviewRouter;
>>>>>>> main
