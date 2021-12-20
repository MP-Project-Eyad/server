const mongoose = require("mongoose");
const foodmenu = new mongoose.Schema({
    Name: { type: String, required: true },
    Picture: { type: String, required: true },
    Desc:{type: String},
    Category:{ type: String, required: true }
});
module.exports = mongoose.model("Foodmenu", foodmenu);