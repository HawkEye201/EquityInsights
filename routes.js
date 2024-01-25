var router = require("express").Router();

const StockDataRouter = require("./api/controllers/stockdata/router");

router.use("/", StockDataRouter);

router.get("/router", (req, res) => {
  res.send("Router.js working fine");
});

module.exports = router;
