const mongoose = require("mongoose");
const offers = new mongoose.Schema({
  StartDate: { type: Date },
  EndDate: { type: Date },
  DiscountDeliveryPrice: { type: Number },
  Restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  companyOffer: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});
module.exports = mongoose.model("Offers", offers);
