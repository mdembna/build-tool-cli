const { exec, cd } = require('shelljs');
const getPath = require('../helpers/getPath');
const log = require('../helpers/log');
const { INFO, ERROR } = require('../constans/log-types');

const compileScss = (repoName) => {
    try {
        cd(getPath(`repos/${repoName}`));
        log(`building library`, INFO);
        exec(`yarn`);
        exec(`yarn build-lib`);
    } catch (err) {
        log(`An error occurred while compiling scss ⚠️`, ERROR);
        log(stderr, ERROR);
        process.exit();
    }
};

module.exports = compileScss;
