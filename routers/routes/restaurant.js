const express = require("express");
const { createRestaurant,getRestaurants,getRestaurantById,updateRestaurant } = require("./../controllers/restaurant");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const restaurantRouter = express.Router();

restaurantRouter.post("/addRestaurant",createRestaurant);
restaurantRouter.get("/getRest",getRestaurants);
restaurantRouter.get("/getRest/:id",getRestaurantById);
restaurantRouter.put("/editRest/:id",updateRestaurant);

module.exports = restaurantRouter;