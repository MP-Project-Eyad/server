const express = require("express");

const {
  getOrder,
  createOrder,
  deletedOrder,
} = require("./../controllers/order");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const orderRouter = express.Router();

orderRouter.get("/orders", authentication, getOrder);
orderRouter.post("/orders", authentication, createOrder);
orderRouter.delete("/delorder/:id", authentication, deletedOrder);

module.exports = orderRouter;
