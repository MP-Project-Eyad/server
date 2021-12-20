const express = require("express");
const { createRestaurant } = require("./../controllers/restaurant");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const restaurantRouter = express.Router();

restaurantRouter.post("/addRestaurant",authentication,createRestaurant)

module.exports = restaurantRouter;