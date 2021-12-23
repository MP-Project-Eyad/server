const express = require("express");

const {getOrder} = require("./../controllers/order");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");


  const orderRouter = express.Router();


  orderRouter.get("/orders",authentication, getOrder);



  module.exports = orderRouter;