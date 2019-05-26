const { exec, cd } = require('shelljs');
const getPath = require('../helpers/getPath');
const log = require('../helpers/log');
const { INFO, ERROR } = require('../constans/log-types');

const compileScss = (repoName) => {
    try {
        cd(getPath(`repos/${repoName}`));
        log(`compiling scss`, INFO);
        exec(`yarn`);
        exec(`yarn sass-compile`);
    } catch (err) {
        log(`An error occurred while compiling scss ⚠️`, ERROR);
        log(stderr, ERROR);
        process.exit();
    }
};

module.exports = compileScss;
