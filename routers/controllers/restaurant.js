const restaurantModel = require("./../../db/models/restaurant");

const createRestaurant = (req, res) => {
  console.log(req.token);
  const { Name, Category, Picture, DeliveryPrice, Menu } = req.body;
  const newRestaurant = new restaurantModel({
    Name,
    Picture,
    Category,
    DeliveryPrice,
    Menu,
  });
  newRestaurant
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getRestaurants = (req, res) => {
    restaurantModel
      .find({})
      .populate("Menu")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  const getRestaurantById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    restaurantModel
    .findById(id).exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  };

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById
};
