const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const foodmenu = new mongoose.Schema({
  RestaurantName: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  Name: { type: String, required: true },
  Picture: { type: String, required: true },
  Desc: { type: String },
  Category: { type: String, required: true },
  price: { type: Number, required: true },
});
module.exports = mongoose.model("Foodmenu", foodmenu);
