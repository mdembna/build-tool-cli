const getPathToRepo = require('../helpers/getPathToRepo');
const fs = require('fs-extra');

const checkIfDirExist = dirName => {
  return !fs.pathExistsSync(getPathToRepo(dirName));
};

module.exports = checkIfDirExist;
