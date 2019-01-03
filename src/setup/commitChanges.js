const { exec, cd } = require('shelljs');
const getPath = require('../helpers/getPath');
const log = require('../helpers/log');
const { INFO, ERROR } = require('../constans/log-types');

const commitChanges = (message, repoName) => {
    try {
        cd(getPath(`repos/${repoName}`));
        log(`Commiting changes`, INFO);
        log(`${message}`, INFO);
        exec(`git add .`);
        exec(`git commit -m "${message}"`);
    } catch (err) {
        log(`An error occurred while commiting changes ⚠️`, ERROR);
        log(stderr, ERROR);
        process.exit();
    }
};

module.exports = commitChanges;
