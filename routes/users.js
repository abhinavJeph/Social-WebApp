const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/sign-up", passport.alreadyLogedIn, usersController.signUp);
router.get("/sign-in", passport.alreadyLogedIn, usersController.signIn);
router.get(
  "/sign-out",
  passport.checkAuthentication,
  usersController.destroySession
);

router.post("/create", usersController.create);

// Use Passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
