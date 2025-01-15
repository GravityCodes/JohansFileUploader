const { Router } = require('express');
const indexController = require("../controller/indexController");
const passport = require('passport');
const indexRouter = Router();

indexRouter.get("/", indexController.welcomeGet);

indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);

indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/log-in",
    failureMessage: true
}));

indexRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = indexRouter;