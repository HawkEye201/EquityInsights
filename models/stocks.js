var mongoose = require("mongoose");

var StocksSchema = new mongoose.Schema(
  {
    name: String,
    favourite: {
      type: Boolean,
      default: false,
    },
    data: [
      {
        code: String,
        open: Number,
        high: Number,
        low: Number,
        close: Number,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

Stocks = mongoose.model("Stocks", StocksSchema, "Stocks");

module.exports = Stocks;
