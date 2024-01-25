const express = require("express");
const controller = require("./controller");

var router = express.Router();

router.route("/top10stocks").get(controller.top10stocks);
router.route("/stocks").get(controller.getStockByName);
router.route("/stockPriceHistory").get(controller.stockPriceHistory);
router.route("/addfavourites").post(controller.addFavourites);
router.route("/getfavourites").get(controller.getFavourites);
router.route("/deletefavourites").post(controller.deleteFavourites);

module.exports = router;
