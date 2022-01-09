const offerModel = require("./../../db/models/offers");
const restaurantModel = require("./../../db/models/restaurant");

const createOffer = (req, res) => {
  const { StartDate, EndDate, DeliveryPrice, Restaurant, CompanyOffer } =
    req.body;
  const newOffer = new offerModel({
    StartDate,
    EndDate,
    DeliveryPrice,
    Restaurant,
    CompanyOffer,
  });
  newOffer
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getOffers = (req, res) => {
  offerModel
    .find({})
    .populate("Restaurant", "Name  -_id")
    .populate("CompanyOffer", "Name  -_id")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getOfferById = (req, res) => {
  const { id } = req.params;

  offerModel
    .findById(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getOfferByRestaurant = (req, res) => {
  const { id } = req.params;

  offerModel
    .find({ Restaurant: id })
    .populate("Restaurant", "Name  -_id")
    .populate("CompanyOffer", "Name  -_id")

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  createOffer,
  getOffers,
  getOfferByRestaurant,
  getOfferById
};
