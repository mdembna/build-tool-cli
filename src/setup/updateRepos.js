const { repositories } = require('../../config.json');
const { cd, exec } = require('shelljs');
const getPathToRepo = require('../helpers/getPathToRepo');
const log = require('../helpers/log');
const { SUCCESS } = require('../constans/log-types');

const updateAndCreateWorkingBranch = reposToUpdate => {
  reposToUpdate.map(repoName => {
    const workingBranch = repositories[repoName].workingBranch;
    const referenceBranch = repositories[repoName].referenceBranch;

    try {
      cd(getPathToRepo(repoName));
      exec(`git checkout ${referenceBranch}`);
      exec(`git pull`);
      exec(`git checkout ${workingBranch} || git checkout -b ${workingBranch}`);
      exec(`git pull origin ${referenceBranch}`);
      log(`Repo ${repoName} up to date, on branch ${workingBranch}`, SUCCESS)
    } catch (err) {
      log(`An error occurred while updating repos ⚠️`, ERROR);
      log(stderr, ERROR);
    }
  });

};

module.exports = updateAndCreateWorkingBranch;
