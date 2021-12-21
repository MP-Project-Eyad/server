const express = require("express");
const { createItem } = require("./../controllers/foodmenu");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const foodmenuRouter = express.Router();

foodmenuRouter.post("/additem",createItem);


module.exports = foodmenuRouter;