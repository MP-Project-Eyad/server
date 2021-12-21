const mongoose = require("mongoose");
const foodmenu = new mongoose.Schema({
    RestaurantName: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"} ,
    Name: { type: String, required: true },
    Picture: { type: String, required: true },
    Desc:{type: String},
    Category:{ type: String, required: true },

});
module.exports = mongoose.model("Foodmenu", foodmenu);