const express = require("express");

// const popupTools = require("popup-tools");
// const passport = require("passport");
// require("./../../Config/passport")
const {
  Register,
  login,
  getUser,
  getUserById,
  updateUser,
  verifyAccount,
  checkEmail,
  resetPassword,
  addToUserCart,
  removeUserCart,
  getCart,
  postCart,
  getCartQty,
  cartDelete,
  cartUpdate
} = require("./../controllers/user");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const userRouter = express.Router();

userRouter.post("/signUp", Register);
userRouter.post("/login", login);
userRouter.post("/verify_account", verifyAccount);
userRouter.post("/email_check", checkEmail);
userRouter.post("/resetpass", resetPassword);
// cart
userRouter.put("/yourcart/:email/:ObjectId", addToUserCart);
userRouter.put("/removecart/:email/:_id", removeUserCart);
userRouter.get("/cart/:email", getCart);


userRouter.get("/users",  getUser);
userRouter.get("/user/:id", authentication, getUserById);
userRouter.put("/edituser/:id",authentication, updateUser);

userRouter.post("/cart",authentication , postCart);
userRouter.get("/cart",authentication , getCartQty);
userRouter.post(
  "/delete-cart-item",
  authentication,
  cartDelete
);
userRouter.post(
  "/reduce-cart-item/:itemId",
  authentication,
  cartUpdate
);

module.exports = userRouter;
