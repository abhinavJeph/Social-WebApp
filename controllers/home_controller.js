const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try{
      
    // CHANGE :: populate the likes of each post and comment
    //populate the post of each user
       let posts=await Post.find({})
       .sort('-createdAt')
    //populating user field of post schema
       .populate('user')
       .populate({
       //populating comments field of post schema
          path:'comments',
          populate:{
             path:'likes'
          },
          populate:{
            //populating user field of comment schema
               path:'user'
            },
       })
       .populate('likes');
         //finding all the users to show them on screen
         //successful response of User.find() will be stored in 'users' variable
       let users=await User.find({});

    return res.render("home", {
      title: "getSocial | Home",
      posts,
      all_users: users,
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("back");
  }
};

// module.exports.actionName = function(req, res){}

// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
