const fs = require('fs-extra');
const path = require('path');
const log = require('./log');
const { ERROR, SUCCESS } = require('../constans/log-types');

const copyEverythingFromDir = (baseDirName, targetDirName) => {
    try {
        fs.readdirSync(baseDirName).forEach(file => {
            const fileBasePath = path.join(baseDirName, file);
            const fileTargetPath = path.join(targetDirName, file);
            if (file === '.git') return;
            fs.copySync(fileBasePath, fileTargetPath);
            log(`${file} copied`, SUCCESS);
        });
    } catch (err) {
        log(`An error occurred while copying files`, ERROR);
        console.log(err);
        process.exit();
    }
}

module.exports = copyEverythingFromDir;