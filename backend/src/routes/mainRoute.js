import express from "express";
const mainRouter = express.Router();

import validateResource from "../middlewares/validateResource.js";
import { findSpotById } from "../controllers/spotController.js";
import { getSpotById } from "../schemas/spotSchema.js";
import { findSpotPageById } from "../controllers/spotController.js";

//TODO: add login system, this page just serves the home page currently

mainRouter.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file

  try {
    return res.status(200).render("home", {
      title: "Home",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});

mainRouter.route("/search").get(async (req, res) => {
  try {
    return res.status(200).render("search", {
      title: "Search",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/login").get(async (req, res) => {
  try {
    return res.status(200).render("login", {
      title: "Login",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/signUp").get(async (req, res) => {
  try {
    return res.status(200).render("signUp", {
      title: "Sign Up",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/verify").get(async (req, res) => {
  try {
    return res.status(200).render("verify", {
      title: "Verify Account",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/spots/create").get(async (req, res) => {
  try {
    return res.status(200).render("createSpot", {
      title: "Create Spot",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});

mainRouter.route("/spots/:id/update").get(async (req, res) => {
  try {
    return res.status(200).render("updateSpot", {
      title: "Update Spot",
    });
  } catch (error) {
    return res.status(500).send("request failed");
  }
});
mainRouter.get("/spots/:id", validateResource(getSpotById), findSpotPageById);

mainRouter.route("/profile").get(async (req, res) => {
  try {
    return res.status(200).render("profile", {title: 'Profile'});
  } catch (error) {
    res.status(500).send("request failed");
  }
});

export default mainRouter;
