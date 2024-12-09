import express from "express";
const mainRouter = express.Router();
import validateResource from "../middlewares/validateResource.js";
import { findSpotById } from "../controllers/spotController.js";
import { getSpotById } from "../schemas/spotSchema.js";

//TODO: add login system, this page just serves the home page currently

mainRouter.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  
  try{
    return res.status(200).render("home", {
      title: "Home",
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});

mainRouter.route('/search').get(async (req, res) => {
  
  try{
    return res.status(200).render('search', {
      title: "Search"
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});
mainRouter.route('/login').get(async (req, res) => {
  
  try{
    return res.status(200).render('login', {
      title: "Login"
  
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/signUp").get(async (req, res) => {
  
  try{
    return res.status(200).render("signUp", {
      title: "Sign Up",
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/verify").get(async (req, res) => {
  
  try{
    return res.status(200).render("verify", {
      title: "Verify Account",
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/spots/create").get(async (req, res) => {
  try{
    return res.status(200).render("createSpot", {
      title: "Create Spot",
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
});
mainRouter.route("/spots/:id/update").get(async (req, res) => {
  try{
    return res.status(200).render("updateSpot", {
      title: "Update Spot",
    });
  }catch(error){
    return res.status(500).send("request failed");
  }
  
});
mainRouter.
route('/spots/:id').get(async (req, res) => {
  //TODO ID validation 
  //TODO IMPLEMENT THIS
  //const spot = getSpot(req.params.id);
  /*
  let reviewObjects = [];
  spot.reviews.forEach(review =>{     //iterate over list of review IDs to assemble an array of review objects
    reviewObjects.push(getReview(review));
  });*/
  const id = req.params.id;
  if (!id) {//test tokens
    throw new "Id must be present.";
  }
  try {
    //TODO: this does not work
    const response = await fetch(`http://localhost:3000/api/v1/spots/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      return res.status(500).send(`Request failed with status: ${response.status}`);
    }
    const spot = { //dummy info
      "id": "s12345556",
      "name": "Fishing lake",
      "hobby": ["fishing", "hiking"],
      "photo": "image/theidasthenameoftheimage.jpg",
      "description": "A cozy fishing spot",
      "location": {
        "Type": "Point",
        "coordinates": [11, 22]
      },
      "reviews": [
        "1234567",
        "1236523",
        "9190123"
      ],
      "likes": [
        "2138761412",
        "8237891243"
      ]
    }
    const reviewObjects = [{ //dummy info
      "_id": "1234567",
      "spot": "s12345556",
      "user": "123-456-789",
      "description": "A cozy fishing spot",
      "ratings": "4",
      "timestamp": "1495255666921"
    }]
  
    return res.status(200).render('spot', {
      title: spot.name,
      image_src: spot.photo,
      spotName: spot.name,
      tagList: spot.hobby,
      spotCoordinates: spot.location.coordinates,
      spotDescription: spot.description,
      likesCount: spot.likes.length,
      review: reviewObjects
    });
  }catch (error) {
    res.status(500).send("request failed")
  }
  
});
//for refrshing reviews list with AJAX
mainRouter.route('/spots/:id/reviews').get(async (req, res) => {
  //TODO ID validation
  //TODO IMPLEMENT THIS
  //const spot = getSpot(req.params.id);
  /*
  let reviewObjects = [];
  spot.reviews.forEach(review =>{     //iterate over list of review IDs to assemble an array of review objects
    reviewObjects.push(getReview(review));
  });*/
  
  const reviewObjects = [//dummy info
    {
      "_id": "1234567",
      "spot": "s12345556",
      "user": "123-456-789",
      "description": "A cozy fishing spot",
      "ratings": "4",
      "timestamp": "1495255666921"
    },
    {
      "_id": "1234567",
      "spot": "s12345556",
      "user": "123-456-789",
      "description": "A cozy fishing spot",
      "ratings": "4",
      "timestamp": "1495255666921"
    },
    {
      "_id": "1234567",
      "spot": "s12345556",
      "user": "123-456-789",
      "description": "A cozy fishing spot",
      "ratings": "4",
      "timestamp": "1495255666921"
    }
  ]
  try {
    return res.status(200).json(reviewObjects);
  } catch (error) {
    res.status(500).send("request failed");
  }
  
});


mainRouter.route("/profile").get(async (req, res) => {
  try {
    return res.status(200).render("profile", {});
  } catch (error) {
    res.status(500).send("request failed");
  }
});


export default mainRouter;
