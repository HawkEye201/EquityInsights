const StockDataService = require("../../services/stockdata.service");

module.exports = {
  top10stocks: async (req, res) => {
    try {
      const { cacheKey } = req.body;
      const top10Stocks = await StockDataService.top10Stocks(cacheKey);
      res.status(200).json(top10Stocks);
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },

  getStockByName: async (req, res) => {
    try {
      const name = req.body.name;

      if (!name || name.length < 3) {
        res.send({ message: "Please enter more than 3 characters to search." });
      } else {
        const stocks = await StockDataService.getStockByName(name);
        if (stocks.length == 0) {
          res.status(404).json({ message: "No Stocks found" });
          return;
        }
        res.status(200).json(stocks);
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },

  stockPriceHistory: async (req, res) => {
    try {
      const code = req.body.code;

      if (!code) {
        res.send({ message: "Please enter something to search." });
      } else {
        const stockHistory = await StockDataService.stockPriceHistory(code);
        if (stockHistory.length == 0) {
          res.status(404).json({ message: "Stock Not Found" });
          return;
        }
        res.send(stockHistory);
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },

  addFavourites: async (req, res) => {
    try {
      const code = req.body.code;

      if (!code) {
        res.send({ message: "Please enter something to search." });
      } else {
        const response = await StockDataService.addFavourites(code);
        res.send(response);
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },

  getFavourites: async (req, res) => {
    try {
      const favorites = await StockDataService.getFavourites();
      res.send(favorites);
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },

  deleteFavourites: async (req, res) => {
    try {
      const code = req.body.code;

      if (!code) {
        res.send({ message: "Please enter something to search." });
      } else {
        const response = await StockDataService.deleteFavourites(code);
        res.send(response);
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  },
};
