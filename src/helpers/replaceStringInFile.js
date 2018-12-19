
const fs = require('fs');
const log = require('../helpers/log');
const { ERROR, SUCCESS} = require('../constans/log-types');
const path = require('path');

const replaceStringInFile = (filesToEdit, dir, toBeReplaced, replacement) => {

    filesToEdit.map(file => {
        const pathToFile = path.resolve(dir, file);

        try{
            const data = fs.readFileSync(pathToFile, 'utf8');

            let oldData = JSON.stringify(data).replace(new RegExp(toBeReplaced, "g"), replacement);
            let result = JSON.parse(oldData);

            fs.writeFileSync(pathToFile, result, 'utf8')

            log(`${file} file updated`, SUCCESS)

        } catch(err) {
            log(`An error occurred while editing a file`, ERROR)
            process.exit();
        }

    })
}

module.exports = replaceStringInFile;
