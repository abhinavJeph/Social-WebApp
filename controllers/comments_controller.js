const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
    }
    req.flash("success", "Comment Created!");
    res.redirect("/");
  } catch (err) {
    req.flash("error", err);
    res.redirect("/");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      const postId = comment.post;

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      comment.remove();

      req.flash("success", "Comment Deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You Can Not Delete This Comment!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
