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
  User.findById(id, function (err, res) {
    if (err) {
      console.log("Error in finding user --> password");
      return done(err);
    }
  });
});
