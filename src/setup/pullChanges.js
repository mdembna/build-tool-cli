const { repositories } = require('../../config.json');
const { cd, exec } = require('shelljs');
const getPathToRepo = require('../helpers/getPathToRepo');
const log = require('../helpers/log');
const { SUCCESS } = require('../constans/log-types');
const deleteFiles = require('../helpers/deleteFiles');


const pullChanges = (repoName, referenceBranch, workingBranch) => {
    const repoPath = getPathToRepo(repoName);
    try {
        cd(repoPath);
        exec(`git checkout ${workingBranch} || git checkout -b ${workingBranch}`);
        exec(`git pull`);
        exec(`git pull origin ${referenceBranch}`);
        log(`Repo ${repoName} up to date, on branch ${workingBranch}`, SUCCESS)
    } catch (err) {
        log(`An error occurred while updating repos ⚠️`, ERROR);
        log(stderr, ERROR);
    }

};

module.exports = pullChanges;
