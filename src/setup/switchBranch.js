const { repositories } = require('../../config.json');
const { cd, exec } = require('shelljs');
const getPathToRepo = require('../helpers/getPathToRepo');
const log = require('../helpers/log');
const { SUCCESS } = require('../constans/log-types');

const switchBranch = (repoName, workingBranch) => {

    try {
        cd(getPathToRepo(repoName));
        exec(`git checkout ${workingBranch} || git checkout -b ${workingBranch}`);
        exec(`git pull`);
        log(`Repo ${repoName} up to date, on branch ${workingBranch}`, SUCCESS)
    } catch (err) {
        log(`An error occurred while updating repos ⚠️`, ERROR);
        log(stderr, ERROR);
    }

};

module.exports = switchBranch;