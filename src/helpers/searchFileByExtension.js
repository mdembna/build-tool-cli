const fs = require('fs-extra');
const path = require('path');
const log = require('../helpers/log');
const { ERROR } = require('../constans/log-types');

const searchFileByExtension = (dir, extension) => {
    let result = [];

    try{
        fs.readdirSync(dir).forEach(file => {
            file = path.resolve(dir, file);
            const stat = fs.statSync(file);

            if (stat.isFile() && file.endsWith(extension)) {
                const fileName = file.substring(file.lastIndexOf('/') + 1);
                result.push(fileName);
                return;
            }
            return;
        })

    } catch(err) {
        log(`Something went wrong`, ERROR);
        console.log(err);
        process.exit();
    }

    return result;
};

module.exports = searchFileByExtension;
