const { find, findById } = require("../models/user");
const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, profile_user) {
    return res.render("user_profile", {
      title: "getSocial | Profile",
      profile_user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     function (err, updatedUser) {
  //       req.flash("success", "Profile Updated Successfully");
  //       return res.redirect("back");
  //     }
  //   );
  // } else {
  //   req.flash("error", "You Are Not Authorized");
  //   return res.redirect("back");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("Error in multer:" + err);
        }
        //Multer adds a body object and file object to the request object.
        //body object contains the values of the text fields of the form.
        //file object contains the files uploaded via the form.
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          //saving the path of uploaded file in avatar field of user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
      });
      user.save();

      req.flash("success", "Profile Updated Successfully");
      return res.redirect("back");
    } catch (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "You Are Not Authorized");
    return res.redirect("back");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "getSocial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "getSocial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirmPassword) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("back");
        }
        req.flash("Success", "Signed Up Successfully!");
        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("error", "User Already Present");
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You Have Logged Out");
  return res.redirect("/");
};
