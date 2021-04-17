module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "getSocial | Profile",
  });
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

module.exports.create = function (req, res) {
  // TODO later
};

module.exports.createSession = function (req, res) {
  // TODO later
};
