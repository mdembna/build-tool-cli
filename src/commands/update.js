const cloneRepositories = require('../setup/cloneRepositories');
const updateRepos = require('../setup/updateRepos');
const checkForReposDir = require('../setup/checkForReposDir');

const update = ({ login, password, packagesToCreate }) => {
    const { reposToClone, necessaryRepos } = checkForReposDir(packagesToCreate);

    reposToClone.length &&
        (cloneRepositories(reposToClone, login, password));

    updateRepos(necessaryRepos);
}

module.exports = update;