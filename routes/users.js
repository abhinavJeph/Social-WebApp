const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.post(
  "/profile/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/sign-up", passport.alreadyLogedIn, usersController.signUp);
router.get("/sign-in", passport.alreadyLogedIn, usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

//sending request to google for user's info
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//this is callback url where google send the info
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
