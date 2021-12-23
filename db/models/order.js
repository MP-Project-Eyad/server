const mongoose = require("mongoose");
const order = new mongoose.Schema({
  Company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  _meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foodmenu",required:true }],
  _restaurant:{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
});
module.exports = mongoose.model("Order", order);
