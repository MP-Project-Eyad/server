const mongoose = require("mongoose");
const offers = new mongoose.Schema({
  StartDate: { type: Date },
  EndDate: { type: Date },
  DiscountDeliveryPrice: { type: Number },
  Restaurant:{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
});
module.exports = mongoose.model("Offers", offers);