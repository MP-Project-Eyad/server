const express = require("express");
const { createItem ,getItems,getItemById} = require("./../controllers/foodmenu");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const foodmenuRouter = express.Router();

foodmenuRouter.post("/additem",createItem);
foodmenuRouter.get("/items",getItems);
foodmenuRouter.get("/item/:id",getItemById);


module.exports = foodmenuRouter;