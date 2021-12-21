const mongoose = require("mongoose");

const company = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordCode: { type: String },
  activeCode: { type: String },
  active: { type: Boolean, default: true },
  avatar: { type: String, default: "http://norapc.org/wp-content/uploads/2015/07/avatar-blank.png" },
  Restaurant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
  Offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offers" }],
  location: {type: String},
});

module.exports = mongoose.model("Company", company);