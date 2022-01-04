const mongoose = require("mongoose");
const offers = new mongoose.Schema({
  StartDate: { type: Date },
  EndDate: { type: Date },
  DeliveryPrice: { type: Number },
  Restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  CompanyOffer: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});
module.exports = mongoose.model("Offers", offers);
