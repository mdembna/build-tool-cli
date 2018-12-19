const { repositories } = require('../../config.json');
const { exec, cd } = require('shelljs');
const getPath = require('../helpers/getPath');
const log = require('../helpers/log');
const { INFO, ERROR, SUCCESS } = require('../constans/log-types');

const cloneRepositories = (reposToClone, username, password) => {

    reposToClone.map(repoName => {
      const repoURL = repositories[repoName].url;
      let repoUrlAuth;

      repoUrlAuth = repoURL.replace('username', username);
      repoUrlAuth = repoUrlAuth.replace('password', password);

      try {
        cd(getPath('repos'));
        log(`Cloning ${repoName} ...`, INFO);
        exec(`git clone ${repoUrlAuth}`);

        log(`${repoName} successfully cloned!`, SUCCESS);

      } catch(err) {
        log(`An error occurred while cloning repos ⚠️`, ERROR);
        log(stderr, ERROR);
        process.exit();
      }

    });
};

module.exports = cloneRepositories;
