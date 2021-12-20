const mongoose = require("mongoose");
const order = new mongoose.Schema({
    Company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Order", order);