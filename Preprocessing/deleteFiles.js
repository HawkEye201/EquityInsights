const { rimraf } = require("rimraf");

const DeleteFiles = async (path) => {
  await rimraf(path, { glob: false }, (err) => {
    if (err) {
      console.error("Error deleting folder:", err);
      return;
    }
    console.log(`Folder '${path}' and all its contents have been deleted.`);
  });
};

module.exports = DeleteFiles;
