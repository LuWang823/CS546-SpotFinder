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
  //TODO: implement getUser(id) function to populate profile page
    //dummy data for now...
  return res.status(200).render('profile',{
    title:"User Profile",
    name: "John Doe",
    email: "123@gmail.com",
    verified: true,
    hobbies: ['fishing', 'hiking', 'skateboarding'],
    address: "123 Street Road, New York",
    spots: [129883190,1290809120398,12498009812,912849012],//array of spot IDs that will be used to reach endpoint that gets spot based on ID
    likedSpots: [1239881903,352145342,989298020], //array of spot id's again
    visitedSpots: [12398231903,352145342,989798020] //array of spot id's again
  });
});


export default mainRouter;