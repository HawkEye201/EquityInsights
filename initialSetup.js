const fs = require("fs");
const downloadData = require("./Services/downloadData");
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

const get50DaysData = () => {
  let currentDate = new Date();

  for (let i = 1; i <= 50; i++) {
    let date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    let formattedDate = `${date.getDate().toString().padStart(2, "0")}${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${date.getFullYear().toString().slice(-2)}`;

    downloadData(formattedDate)
      .then((response) => {
        const zipFilePath = `./Data/${formattedDate}.zip`;
        fs.writeFileSync(zipFilePath, Buffer.from(response.data));
      })
      .catch((error) => {});
  }
};

get50DaysData();
