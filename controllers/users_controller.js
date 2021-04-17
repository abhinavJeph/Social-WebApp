module.exports.profile = function (req, res) {
  return res.render("../views/users.ejs", {
    title: "Profile",
  });
};
