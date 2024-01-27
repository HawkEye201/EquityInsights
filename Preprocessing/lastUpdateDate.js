const fs = require("fs");

const filePath = "./lastUpdateDate.json";

const fetchLastUpdateDate = async () => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const lastUpdateDate = JSON.parse(data).lastUpdateDate;
    return lastUpdateDate;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

const saveLastUpadteDate = (date) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const newData = JSON.stringify({ lastUpdateDate: `${date}` });
      console.log(newData);

      fs.writeFile(filePath, newData, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("File updated successfully.");
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
};

module.exports = { fetchLastUpdateDate, saveLastUpadteDate };
