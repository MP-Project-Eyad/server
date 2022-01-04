const restaurantModel = require("./../../db/models/restaurant");
const companyModel = require("./../../db/models/company");

const createRestaurant = (req, res) => {
  const { Name, Category, Picture, CompanyName, Menu } = req.body;
  const newRestaurant = new restaurantModel({
    Name,
    Picture,
    Category,
    Menu,
    CompanyName,
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
    .populate("Menu", "Name  -_id")
    .populate("CompanyName", "Name  -_id")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getRestaurantById = (req, res) => {
  const { id } = req.params;

  restaurantModel
    .findById(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateRestaurant = (req, res) => {
  const { id } = req.params;
  const { Name, Category, Picture, DeliveryPrice, Menu } = req.body;

  restaurantModel
    .findByIdAndUpdate(
      id,
      { $set: { Name, Category, Picture, DeliveryPrice } },
      { new: true }
    )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deletedRestaurant = (req, res) => {
  const { id } = req.params;

  restaurantModel
    .findByIdAndRemove(id)
    .exec()
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
  getRestaurantById,
  updateRestaurant,
  deletedRestaurant,
};
