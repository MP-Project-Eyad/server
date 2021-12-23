const Order = require("./../../db/models/order");
// const _ = require("lodash");




function handleError(res, err) {
  return res.send(500, err);
}

// Get list of orders
const getOrder = (req, res) => {
    console.log(req.token.id);
  Order.find({ User: req.token.id })
    .populate("_restaurant")
    .populate("Company")
    .exec().then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
};




module.exports = {getOrder}