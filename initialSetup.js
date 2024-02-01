const fs = require("fs");
const DownloadData = require("./Preprocessing/downloadData");
const ExtractZip = require("./Preprocessing/extractData");
const StocksSchema = require("./models/stocks");
const DeleteFiles = require("./Preprocessing/deleteFiles");
const {
  fetchLastUpdateDate,
  saveLastUpadteDate,
} = require("./Preprocessing/lastUpdateDate");
const path = "./Data";

fs.access(path, async (error) => {
  if (!error) {
    await DeleteFiles(path);
  }
  fs.mkdir(path, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

const formatDate = (date) => {
  return `${date.getDate().toString().padStart(2, "0")}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getFullYear().toString().slice(-2)}`;
};

const get50DaysData = async () => {
  let currentDate = new Date();
  const dataToInsert = [];

  const lastUpdateDate = new Date(await fetchLastUpdateDate());
  const lastUpdateFormattedDate = formatDate(lastUpdateDate);
  const currentFormattedDate = formatDate(currentDate);
  console.log("Last Update Date: " + lastUpdateDate);

  if (lastUpdateFormattedDate == currentFormattedDate) {
    console.log("Already up to date");
  } else {
    let date = new Date();

    if (isNaN(lastUpdateDate.getTime())) {
      date.setDate(currentDate.getDate() - 50);
    } else {
      date = lastUpdateDate;
    }

    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    for (; date < currentDateOnly; date.setDate(date.getDate() + 1)) {
      let formattedDate = formatDate(date);

      await DownloadData(formattedDate)
        .then(async (response) => {
          // console.log(date);
          const zipFilePath = `./Data/${formattedDate}.zip`;
          if (response.data) {
            fs.writeFileSync(zipFilePath, Buffer.from(response.data));
            const csvData = ExtractZip(zipFilePath);
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
                  date: new Date(date),
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
                      date: new Date(date),
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
      console.log("Data downloaded");
      if (isNaN(lastUpdateDate.getTime())) {
        await StocksSchema.deleteMany({});
        await StocksSchema.insertMany(dataToInsert);
        console.log("Data inserted in MongoDB successfully!");
      } else {
        const bulkOperations = dataToInsert.map(({ code, data }) => ({
          updateOne: {
            filter: { code },
            update: { $push: { data: { $each: data } } },
          },
        }));
        const result = await StocksSchema.bulkWrite(bulkOperations, {
          ordered: false,
        });
        console.log(`${result.modifiedCount} document(s) updated.`);
      }
      saveLastUpadteDate(currentDate);
      DeleteFiles(path);
    } catch (error) {
      console.log(error.message);
    }
  }
};

get50DaysData();
