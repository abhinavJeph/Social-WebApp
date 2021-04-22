const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creating Post" + err);
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Error in finding Post" + err);
      return res.redirect("back");
    }
    // .id means converting the object _id into string
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        if (err) {
          console.log("Error in deleting comments" + err);
          return res.redirect("back");
        }
        return res.redirect("back");
      });
    }
  });
};
