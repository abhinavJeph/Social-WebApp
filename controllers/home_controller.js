const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    // populate the user of each post
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "getSocial | Home",
      posts,
      all_users: users,
    });
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

//module.exports.actionName = function(req, res){}
