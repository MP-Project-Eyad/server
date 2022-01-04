const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordCode: { type: String },
  activeCode: { type: String },
  active: { type: Boolean, default: false },
  avatar: {
    type: String,
    default: "http://norapc.org/wp-content/uploads/2015/07/avatar-blank.png",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c0669bc57410a2c9733a01",
  },
  cart: {
    items: [
      {
        _id: false,
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Foodmenu",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },

  location: { type: String },
});

user.methods.addToCart = function (item) {
  const cartItemIndex = this.cart.items.findIndex((cp) => {
    return cp.itemId.toString() === item._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      itemId: item._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

user.methods.reduceQuantity = function (itemId) {
  const newCart = this.cart.items.map((item) => {
    if (item.itemId.toString() === itemId.toString())
      return {
        ...item.toObject(),
        quantity: item.quantity - 1,
      };
    return item.toObject();
  });
  const finalNewCart = newCart.filter((item) => {
    return item.quantity > 0;
  });
  this.cart.items = finalNewCart;
  return this.save();
};

user.methods.removeFromCart = function (itemId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.itemId.toString() !== itemId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

user.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", user);
