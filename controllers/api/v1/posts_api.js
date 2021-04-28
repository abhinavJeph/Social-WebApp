const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({});
  return res.json(200, {
    message: "List of Posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object _id into string
    //   if (post.user == req.user.id) {
    post.remove();

    // if (req.xhr) {
    //   return res.status(200).json({
    //     data: {
    //       post_id: req.params.id,
    //     },
    //     message: "Post Deleted",
    //   });
    // }
    await Comment.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: "Post Deleted!",
    });
    //   } else {
    //     return res.redirect("back");
    //   }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
