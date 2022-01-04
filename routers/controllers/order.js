const Order = require("./../../db/models/order");
const companyModel = require("./../../db/models/company");
const restaurantModel = require("./../../db/models/restaurant");

// const _ = require("lodash");

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of orders
const getOrder = (req, res) => {
  // console.log(req.token.id);
  Order.find({ User: req.token.id })
    .populate("_restaurant Company _meals")
    // .populate("Company")
    .exec()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createOrder = (req, res) => {
  const { Company, User, _meals, _restaurant } = req.body;
  const newOrder = new Order({
    Company,
    User: req.token.id,
    _meals,
    _restaurant,
  });
  newOrder
    .save()
    .then((result) => {
      restaurantModel
        .findByIdAndUpdate(_restaurant, { $push: { Menu: result._id } })
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deletedOrder = (req, res) => {
  const { id } = req.params;

  console.log(id);
  Order.findByIdAndRemove(id)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { getOrder, createOrder, deletedOrder };
