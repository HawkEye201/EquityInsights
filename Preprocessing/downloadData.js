const axios = require("axios");
const fs = require("fs");

const downloadData = async (date) => {
  try {
    // console.log(date);
    const zipUrl = `https://www.bseindia.com/download/BhavCopy/Equity/EQ${date}_CSV.ZIP`;

    const response = await axios({
      method: "get",
      url: zipUrl,
      responseType: "arraybuffer",
    });

    return response;
  } catch (error) {
    return error;
  }
};

module.exports = downloadData;
