const mongoose = require("mongoose");

const restaurant = new mongoose.Schema({
  Name: { type: String, required: true },
  CompanyName: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  Category: { type: String, required: true },
  Picture: { type: String, required: true },
  DeliveryPrice: { type: Number },
  Menu: { type: mongoose.Schema.Types.ObjectId, ref: "Foodmenu" },
});

module.exports = mongoose.model("Restaurant", restaurant);
