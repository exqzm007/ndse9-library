const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const isAuth = require("../middlewares/isAuth");

router
  .get("/login", (req, res) => {
    res.render("pages/auth/login", { title: "Log in" });
  })
  .post("/login", passport.authenticate('local', { failureRedirect: '/user/login' }),
    function(req, res) {
      res.redirect('/');
    }
  )
  .get("/signup", (req, res) => {
    res.render("pages/auth/signup", { title: "Sign up" });
  })
  .post("/signup", async (req, res, next) => {
    try {
      const { name, surname, login, password } = req.body;
      const userToSave = new User({
        name: name,
        surname: surname,
        login: login,
        password: password 
      });
      await userToSave.save();
      req.login({ id: userToSave._id }, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    } catch (e) {
        res.status(500).json({
            error: "An error occured while creating a user",
            errormessage: e.message
        });
    }
  })
  .get("/me", isAuth, (req, res) => {
    res.render("pages/user/index", { title: "User profile", user: req.user });
  })
  .get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  })

module.exports = router;