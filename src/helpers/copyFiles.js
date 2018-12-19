const fs = require('fs-extra');
const path = require('path');
const log = require('./log');
const { ERROR, SUCCESS } = require('../constans/log-types');

const copyFiles = (filesToCopy, copyFrom, copyTo) => {
  try {
    filesToCopy.map(file => {
      const copyFromPath = path.join(copyFrom, file);
      const copyToPath = path.join(copyTo, file);
      fs.copySync(copyFromPath, copyToPath);
      log(`${file} copied`, SUCCESS);
    });
  } catch (err) {
    log(`An error occurred while copying files`, ERROR);
    console.log(err);
    process.exit();
  }
};

module.exports = copyFiles;
