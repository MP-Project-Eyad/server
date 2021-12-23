const express = require("express");

const {getOrder, createOrder} = require("./../controllers/order");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");


  const orderRouter = express.Router();


  orderRouter.get("/orders",authentication, getOrder);
  orderRouter.post("/orders",authentication, createOrder);



  module.exports = orderRouter;