const express = require("express");


const {
  companyRegister,
  companyLogin,
} = require("./../controllers/company");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const companyRouter = express.Router();
companyRouter.post("/comsignUp", companyRegister);
companyRouter.post("/comlogin", companyLogin);


module.exports = companyRouter;