const fs = require('fs-extra');
const path = require('path');
const log = require('../helpers/log');
const { ERROR, SUCCESS } = require('../constans/log-types');

const deleteFiles = (filesToRemove, dir) => {
  try {
    filesToRemove.map(file => {
      fs.removeSync(path.join(dir, file));
      log(`${file} file deleted`, SUCCESS);
    });
  } catch (err) {
    log(`An error occurred while deleting files`, ERROR);
    process.exit();
  }
};

module.exports = deleteFiles;
