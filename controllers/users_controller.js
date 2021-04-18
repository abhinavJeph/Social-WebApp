const User = require("../models/user.js");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log("Error in finding the user in profile");
        return;
      }
      if (user) {
        res.render("user_profile", {
          title: "getSocial | Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-up");
      }
    });
  } else {
    return res.redirect("/users/sign-up");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "getSocial | SignUp",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "getSocial | SignIn",
  });
};

module.exports.signOut = function (req, res) {
  res.clearCookie(req.cookie);
  res.redirect("/users/sign-in");
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirmPassword) {
    console.log(req.body.password + " and " + req.body.confirmPassword);
    console.log("Password did not match");
    return res.redirect("back");
  }

  User.findOne({ emial: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user");
          return;
        }
        console.log("User created");
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  // TODO later
  // check if user exist
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in signing in");
      return;
    }

    if (user) {
      if (user.password === req.body.password) {
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        console.log("Password Not match");
        return req.redirect("back");
      }
    } else {
      console.log("User Not found");
      return res.redirect("back");
    }
  });
};
