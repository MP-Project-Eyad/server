const express = require("express");

// const popupTools = require("popup-tools");
// const passport = require("passport");
// require("./../../Config/passport")
const {
  Register,
  login,
  getUser
} = require("./../controllers/user");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const userRouter = express.Router();
userRouter.post("/signUp", Register);
userRouter.post("/login",login);

userRouter.get("users",getUser);


module.exports = userRouter;