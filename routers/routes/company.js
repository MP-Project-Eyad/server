const express = require("express");


const {
  companyRegister,
  companyLogin,
  verifyAccountComp,
  getCompany
} = require("./../controllers/company");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const companyRouter = express.Router();
companyRouter.post("/comsignUp", companyRegister);
companyRouter.post("/comlogin", companyLogin);
companyRouter.post("/verify_comp_account", verifyAccountComp);
companyRouter.get("/company", getCompany)


module.exports = companyRouter;