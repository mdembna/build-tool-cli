const fs = require('fs');
const log = require('../helpers/log');
const { ERROR, SUCCESS } = require('../constans/log-types');
const path = require('path');


const replaceStringInFile = (filesToEdit, dir, toBeReplaced, replacement) => {
  filesToEdit.map(file => {
    const pathToFile = path.join(dir, file);

    try {
      const data = fs.readFileSync(pathToFile, 'utf8');
      let oldData;

      if (file == "package.json") {
        oldData = JSON.stringify(data).replace(
          new RegExp(`(?<=mdbvue-|\\\\"version\\\\": \\\\"|\\\\"mdbvue\\\": \\\\"|replace ')` + toBeReplaced, 'g'),
          replacement
        );
      } else {
        oldData = JSON.stringify(data).replace(
          new RegExp(toBeReplaced, 'g'),
          replacement
        );
      }

      const result = JSON.parse(oldData);

      fs.writeFileSync(pathToFile, result, 'utf8');

      log(`${file} file updated`, SUCCESS);
    } catch (err) {
      log(`An error occurred while editing a file`, ERROR);
      process.exit();
    }
  });
};

module.exports = replaceStringInFile;
