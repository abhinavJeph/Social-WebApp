const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post,
        },
        message: "Post Published!",
      });
    }
    req.flash("success", "Post Published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object _id into string
    if (post.user == req.user.id) {
      post.remove();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted",
        });
      }
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post Deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You Can Not Delete This Post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("back");
  }
};
