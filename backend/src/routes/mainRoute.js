import express from "express";
const mainRouter = express.Router();
import validateResource from "../middlewares/validateResource.js";
import { findSpotById } from "../controllers/spotController.js";
import { getSpotById } from "../schemas/spotSchema.js";

//TODO: add login system, this page just serves the home page currently

mainRouter.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  return res.status(200).render("home", {
    title: "Home",
  });
});

mainRouter.route('/search').get(async (req, res) => {
  return res.status(200).render('search', {
    title: "Search"
  });
});
mainRouter.route('/login').get(async (req, res) => {
  return res.status(200).render('login', {
    title: "Login"

  });
});
mainRouter.route("/signUp").get(async (req, res) => {
  return res.status(200).render("signUp", {
    title: "Sign Up",
  });
});
mainRouter.route("/verify").get(async (req, res) => {
  return res.status(200).render("verify", {
    title: "Verify Account",
  });
});
mainRouter.route("/spots/:id/update").get(async (req, res) => {
  return res.status(200).render("updateSpot", {
    title: "Update Spot",
  });
});


mainRouter.route("/profile").get(async (req, res) => {
  try {
    return res.status(200).render("profile", {});
  } catch (error) {
    res.status(500).send("request failed");
  }
});


export default mainRouter;
