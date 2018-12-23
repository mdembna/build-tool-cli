const { repositories } = require('../../config.json');
const {
  RE_ADMIN,
  RE_BOUNDLE,
  RE_PRO,
  RE_FREE
} = require('../constans/packages-types');
const checkIfDirExist = require('../helpers/checkIfDirExist');

const checkForReposDir = packagesToCreate => {
  let reposToClone = [];
  let allRepoNames = Object.keys(repositories);
  let necessaryRepos = [];

  if (packagesToCreate.includes(RE_BOUNDLE)) {
    necessaryRepos = [...allRepoNames];
  } else {
    if (packagesToCreate.includes(RE_ADMIN))
      necessaryRepos.push('mdb-react-admin-pro', 're-pro');

    if (packagesToCreate.includes(RE_PRO) || packagesToCreate.includes(RE_FREE))
      necessaryRepos.push('react-demo', 're-pro');

    if (packagesToCreate.includes(RE_FREE))
      necessaryRepos.push('React-Bootstrap-with-Material-Design');
  }

  necessaryRepos.map(repoName => {
    if (checkIfDirExist(repoName)) reposToClone.push(repoName);
  });

  return { reposToClone, necessaryRepos };
};

module.exports = checkForReposDir;
