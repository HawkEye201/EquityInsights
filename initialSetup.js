const fs = require("fs");
const DownloadData = require("./Preprocessing/downloadData");
const ExtractZip = require("./Preprocessing/extractData");
const StocksSchema = require("./models/stocks");
const path = "./Data";

fs.access(path, (error) => {
  if (error) {
    fs.mkdir(path, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

const get50DaysData = async () => {
  let currentDate = new Date();

  const dataToInsert = [];

  for (let i = 50; i >= 1; i--) {
    let date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    let formattedDate = `${date.getDate().toString().padStart(2, "0")}${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${date.getFullYear().toString().slice(-2)}`;

    await DownloadData(formattedDate)
      .then(async (response) => {
        const zipFilePath = `./Data/${formattedDate}.zip`;

        if (response.data) {
          fs.writeFileSync(zipFilePath, Buffer.from(response.data));
          const csvData = ExtractZip(zipFilePath);

          // StoreData(csvData, date);
          const lines = csvData.split("\n").slice(1);
          for (const line of lines) {
            const [code, name, group, type, open, high, low, close] =
              line.split(",");
            if (!open) {
              break;
            }
            const existingStock = await dataToInsert.find(
              (stock) => stock.code === code
            );
            if (existingStock) {
              existingStock.data.push({
                open: parseFloat(open),
                high: parseFloat(high),
                low: parseFloat(low),
                close: parseFloat(close),
                date: date,
              });
            } else {
              dataToInsert.push({
                name: name,
                code: code,
                data: [
                  {
                    open: parseFloat(open),
                    high: parseFloat(high),
                    low: parseFloat(low),
                    close: parseFloat(close),
                    date: date,
                  },
                ],
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  try {
    await StocksSchema.deleteMany({});
    await StocksSchema.insertMany(dataToInsert);
    console.log("Data updated in MongoDB successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

get50DaysData();
