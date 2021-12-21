const express = require("express");
const { createRestaurant,getRestaurants } = require("./../controllers/restaurant");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const restaurantRouter = express.Router();

restaurantRouter.post("/addRestaurant",createRestaurant);
restaurantRouter.get("/getRest",getRestaurants);

module.exports = restaurantRouter;