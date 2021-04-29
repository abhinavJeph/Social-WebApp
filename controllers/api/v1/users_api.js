const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid Username/Password",
      });
    }
    return res.json(200, {
      message: "Sign In successfull, Here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "jineMeraDilLuteya", {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
