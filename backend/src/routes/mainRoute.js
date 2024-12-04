import express from "express";
const mainRouter = express.Router();
//TODO: add login system, this page just serves the home page currently

mainRouter.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  return res.status(200).render('home', {
    title: "Home"
  });
});
mainRouter.route('/login').get(async (req, res) => {
  return res.status(200).render('login', {
    title: "Login"
  });
});
mainRouter.route('/signUp').get(async (req, res) => {
  return res.status(200).render('signUp', {
    title: "Sign Up"
  });
});
mainRouter.route('/verify').get(async (req, res) => {
  return res.status(200).render('verify', {
    title: "Verify Account"
  });
});
mainRouter.route('/profile/:accessToken/:refreshToken').get(async (req, res) => {
  const { accessToken, refreshToken } = req.params;
  if (!accessToken || !refreshToken) {//test tokens
    return res.status(400).json({ message: "Tokens are required" });
  }
  try {
    //TODO: this does not work
    const response = await fetch("localhost:3000/api/v1/users/me", {
      method: "GET", // Or "POST" if the endpoint expects it
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Add content type header if necessary
      },
    });
    if (!response.ok) {
      res.status(500).send(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();
    return res.status(200).render('profile', {
      title: "User Profile",
      name: result.name,
      email: result.email,
      verified: result.verified,
      hobbies: result.hobbies,
      address: result.address,
      spots: result.spot,//array of spot IDs that will be used to reach endpoint that gets spot based on ID
      likedSpots: result['liked spot'], //array of spot id's again
      visitedSpots: result['visited spot'] //array of spot id's again
    });
  } catch (error) {
    res.status(500).send("request failed")
  }

});
mainRouter.route('/spots/:id').get(async (req, res) => {
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
    "hobby": ["fishing","hiking"],
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
});


export default mainRouter;