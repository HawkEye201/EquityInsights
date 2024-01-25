var mongoose = require("mongoose");

var StocksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    data: [
      {
        open: { type: Number, required: true },
        high: { type: Number, required: true },
        low: { type: Number, required: true },
        close: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

StocksSchema.index({ code: 1 });

Stock = mongoose.model("Stock", StocksSchema, "Stock");

module.exports = Stock;
