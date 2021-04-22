const express = require("express");
const commentsController = require("../controllers/comments_controller");
const router = express.Router();
const passport = require("passport");

router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;
