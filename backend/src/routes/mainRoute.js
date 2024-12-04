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
  return res.status(200).render('login',{
    title:"Login"
  });
});
mainRouter.route('/signUp').get(async (req, res) => {
  return res.status(200).render('signUp',{
    title:"Sign Up"
  });
});
mainRouter.route('/verify').get(async (req, res) => {
  return res.status(200).render('verify',{
    title:"Verify Account"
  });
});
mainRouter.route('/profile/:accessToken/:refreshToken').get(async (req, res) => {
  const { accessToken, refreshToken } = req.params;
  if (!accessToken || !refreshToken) {//test tokens
    return res.status(400).json({ message: "Tokens are required" });
  }
  try {
    console.log('here1')
    const response = await fetch("http::localhost:3000/api/v1/users/me", { 
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
    return res.status(200).render('profile',{
      title:"User Profile",
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


export default mainRouter;