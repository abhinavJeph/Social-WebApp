const Comment = require("../models/comment");
const Post = require("../models/post");
// const commentMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.unshift(comment);
      post.save();

      comment = await comment.populate("user", "name email").execPopulate();

      // commentMailer.newComment(comment);
      let job = queue.create("email", comment).save(function (err) {
        if (err) {
          console.log("Error in creating a queue", err);
          return;
        }
        console.log("job enqueued", job.id);
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment,
          },
          message: "Comment Created!",
        });
      }

      req.flash("success", "Comment Created!");
    }

    res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
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

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_Id: req.params.id,
          },
          message: "Comment Deleted!",
        });
      }

      req.flash("success", "Comment Deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You Can Not Delete This Comment!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("back");
  }
};
