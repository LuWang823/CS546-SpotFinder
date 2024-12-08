import express from "express";
const mainRouter = express.Router();
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

mainRouter.route("/profile").get(async (req, res) => {
  try {
    return res.status(200).render("profile", {});
  } catch (error) {
    res.status(500).send("request failed");
  }
});
mainRouter.route("/spots/:id").get(async (req, res) => {
  //TODO ID validation

  //TODO IMPLEMENT THIS
  //const spot = getSpot(req.params.id);
  /*
  let reviewObjects = [];
  spot.reviews.forEach(review =>{     //iterate over list of review IDs to assemble an array of review objects
    reviewObjects.push(getReview(review));
  });*/


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
    reviews: ["1234567", "1236523", "9190123"],
    likes: ["2138761412", "8237891243"],
  };
  const reviewObjects = [
    {
      //dummy info
      _id: "1234567",
      spot: "s12345556",
      user: "123-456-789",
      description: "A cozy fishing spot",
      ratings: "4",
      timestamp: "1495255666921",
    },
  ];

  return res.status(200).render("spot", {
    title: spot.name,
    image_src: spot.photo,
    spotName: spot.name,
    tagList: spot.hobby,
    spotCoordinates: spot.location.coordinates,
    spotDescription: spot.description,
    likesCount: spot.likes.length,
    review: reviewObjects,
  });
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

  return res.status(200).json(reviewObjects);
});

export default mainRouter;
