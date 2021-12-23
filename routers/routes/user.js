const express = require("express");

// const popupTools = require("popup-tools");
// const passport = require("passport");
// require("./../../Config/passport")
const {
  Register,
  login,
  getUser,
  verifyAccount,
  checkEmail,
  resetPassword,
  addToCart
} = require("./../controllers/user");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const userRouter = express.Router();

userRouter.post("/signUp", Register);
userRouter.post("/login", login);
userRouter.post("/verify_account", verifyAccount);
userRouter.post("/email_check", checkEmail);
userRouter.post("/resetpass", resetPassword);
userRouter.put("/yourcart/:email/:ObjectId", addToCart);

userRouter.get("/users", authentication,  getUser);

module.exports = userRouter;
