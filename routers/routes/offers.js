const express = require("express");
const {
    createOffer,
    getOffers,
    getOfferByRestaurant,
} = require("./../controllers/offers");

const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const offersRouter = express.Router();

offersRouter.post("/addOffer", createOffer);
offersRouter.get("/getOffers", getOffers);
offersRouter.get("/getOffer/:id", getOfferByRestaurant);
module.exports = offersRouter;