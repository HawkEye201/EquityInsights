const StocksSchema = require("../../models/stocks");

class StockDataService {
  async top10Stocks() {
    try {
      const top10Stocks = await StocksSchema.find().limit(10);
      const stockNames = top10Stocks.map((stock) => stock.name);
      return stockNames;
    } catch (error) {
      throw { message: error.message };
    }
  }

  async getStockByName(name) {
    try {
      const stocksByName = await StocksSchema.find({
        name: new RegExp(name, "i"),
      });
      const stockNames = stocksByName.map((stock) => {
        return { name: stock.name, code: stock.code };
      });
      return stockNames;
    } catch (error) {
      throw { message: error.message };
    }
  }

  async stockPriceHistory(code) {
    try {
      const stockHistory = await StocksSchema.findOne({ code });
      return stockHistory ? stockHistory.data : [];
    } catch (error) {
      throw { message: error.message };
    }
  }

  async addFavourites(code) {
    try {
      const response = await StocksSchema.updateOne(
        { code },
        { $set: { favourite: true } }
      );
      if (response.modifiedCount > 0) {
        return { message: "Stock added to favourites successfully" };
      } else {
        return {
          message:
            "No document matched the query or the field value was already set to the new value",
        };
      }
    } catch (error) {
      throw { message: error.message };
    }
  }

  async getFavourites() {
    try {
      const favouriteStocks = await StocksSchema.find({ favourite: true });
      const favouriteStockNames = favouriteStocks.map((stock) => {
        return { name: stock.name, code: stock.code };
      });
      return favouriteStockNames;
    } catch (error) {
      throw { message: error.message };
    }
  }

  async deleteFavourites(code) {
    try {
      const response = await StocksSchema.updateOne(
        { code },
        { $set: { favourite: false } }
      );
      if (response.modifiedCount > 0) {
        return { message: "Stock deleted from favorites successfully" };
      } else {
        return {
          message:
            "No document matched the query or the field value was already set to the new value",
        };
      }
    } catch (error) {
      throw { message: error.message };
    }
  }
}

module.exports = new StockDataService();
