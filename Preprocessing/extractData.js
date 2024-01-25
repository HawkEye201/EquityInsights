const AdmZip = require("adm-zip");

const ExtractZip = (zipFilePath) => {
  const zip = new AdmZip(zipFilePath);
  const zipEntries = zip.getEntries();
  const csvEntry = zipEntries.find((entry) => entry.name.endsWith(".CSV"));

  if (!csvEntry) {
    throw new Error("CSV file not found in the ZIP.");
  }

  const csvData = zip.readAsText(csvEntry);
  // console.log(csvData);
  return csvData;
};

module.exports = ExtractZip;
