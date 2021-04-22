const express = require("express");
const commentsController = require("../controllers/comments_controller");
const router = express.Router();
const passport = require("passport");

router.post("/create", passport.checkAuthentication, commentsController.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentsController.destroy
);

module.exports = router;
