const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("Could not find Post of this comment");
      return res.redirect("/");
    }

    Comment.create(
      {
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      },
      function (err, comment) {
        if (err) {
          console.log("Could not create comment" + err);
          return res.redirect("/");
        }

        post.comments.push(comment);
        post.save();

        res.redirect("/");
      }
    );
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      console.log("Could not find comment" + err);
      return res.redirect("/");
    }

    if (comment.user == req.user.id) {
      const postId = comment.post;

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("/");
        }
      );
      comment.remove();
    } else {
      return res.redirect("/");
    }
  });
};
