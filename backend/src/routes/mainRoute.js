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
mainRouter.route('/test').post(async (req, res) => {
  return res.status(200).json(req.body);
});


export default mainRouter;