const { repositories } = require('../../config.json');
const {
  VU_ADMIN,
  VU_BUNDLE,
  VU_PRO,
  VU_FREE
} = require('../constans/packages-types');
const checkIfDirExist = require('../helpers/checkIfDirExist');

const checkForReposDir = packagesToCreate => {
  let reposToClone = [];
  let allRepoNames = Object.keys(repositories);
  let necessaryRepos = ['vu-pro'];

  if (packagesToCreate.includes(VU_BUNDLE)) {
    necessaryRepos.push('mdbvue-admin-pro', 'vue-demo');
  } else {
    if (packagesToCreate.includes(VU_ADMIN))
      necessaryRepos.push('mdbvue-admin-pro');

    if (packagesToCreate.includes(VU_PRO) || packagesToCreate.includes(VU_FREE))
      necessaryRepos.push('vue-demo');

    if (packagesToCreate.includes(VU_FREE))
      necessaryRepos.push('Vue-Bootstrap-with-Material-Design', 'bootstrap-material-design');
  }

  necessaryRepos.map(repoName => {
    if (checkIfDirExist(repoName)) reposToClone.push(repoName);
  });

  return { reposToClone, necessaryRepos };
};

module.exports = checkForReposDir;
