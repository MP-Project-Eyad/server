const express = require("express");
const { createItem ,getItems,getItemById,updateItem} = require("./../controllers/foodmenu");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const foodmenuRouter = express.Router();

foodmenuRouter.post("/additem",createItem);
foodmenuRouter.get("/items",getItems);
foodmenuRouter.get("/item/:id",getItemById);
foodmenuRouter.put("/edititem/:id",updateItem);

module.exports = foodmenuRouter;