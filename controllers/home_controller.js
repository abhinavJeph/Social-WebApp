module.exports.home = function (req, res) {
  return res.render("../views/home.ejs", {
    title: "Home",
  });
};

//module.exports.actionName = function(req, res){}
