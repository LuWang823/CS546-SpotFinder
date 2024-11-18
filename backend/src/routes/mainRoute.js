import express from "express";
const mainRouter = express.Router();
//TODO: add login system, this page just serves the home page currently

mainRouter.route('/').get(async (req, res) => {
    //code here for GET will render the home handlebars file
    return res.status(200).render('home', {
      title: "Home"
    });
  });

export default mainRouter;