const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordCode: { type: String },
  activeCode: { type: String },
  active: { type: Boolean, default: false },
  avatar: { type: String, default: "http://norapc.org/wp-content/uploads/2015/07/avatar-blank.png" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: "" },
  location: {type: Location},
});

module.exports = mongoose.model("User", user);

