const express = require("express");
const routes = express.Router();
const homeController = require("../controllers/home_controller");

routes.get("/", homeController.home);

console.log("routes is loaded");
module.exports = routes;
