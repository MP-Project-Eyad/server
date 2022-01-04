const foodmenuModel = require("./../../db/models/foodmenu");
const restaurantModel = require("./../../db/models/restaurant");

const createItem = (req, res) => {
  const { Name, Category, Picture, Desc, RestaurantName, price } = req.body;
  const newItem = new foodmenuModel({
    Name,
    Picture,
    Category,
    Desc,
    price,
    RestaurantName,
  });
  newItem
    .save()
    .then((result) => {
      restaurantModel
        .findByIdAndUpdate(RestaurantName, { $push: { Menu: result._id } })
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getItems = (req, res) => {
  foodmenuModel
    .find({})
    .populate("RestaurantName", "Name")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getItemById = (req, res) => {
  const { id } = req.params;

  restaurantModel
    .findById({ _id: id })
    .populate("Menu")
    .exec()
    .then((result) => {
      res.status(200).json(result.Menu);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const { Name, Picture, Category, Desc, price } = req.body;

  foodmenuModel
    .findByIdAndUpdate(
      id,
      { $set: { Name, Picture, Category, Desc, price } },
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

const deletedItem = (req, res) => {
  const { id } = req.params;

  foodmenuModel
    .findByIdAndRemove(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { createItem, getItems, getItemById, updateItem, deletedItem };
