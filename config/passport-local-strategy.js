const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish his identity
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("Error in finding user --> password");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing the  user to decide which key is to be kep in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> password");
      return done(err);
    }

    return done(null, user.id);
  });
});

// Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to next (Controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.sentAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are sending this to the locals for views
    res.locals.user = req.user;
    next();
  }
};

module.exports = passport;
