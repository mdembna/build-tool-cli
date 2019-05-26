const { repositories } = require('../../config.json');
const { cd, exec } = require('shelljs');
const getPathToRepo = require('../helpers/getPathToRepo');
const log = require('../helpers/log');
const { SUCCESS } = require('../constans/log-types');
const deleteFiles = require('../helpers/deleteFiles');


const checkoutToBranch = (repoName) => {
    const repoPath = getPathToRepo(repoName);
    try {
        cd(repoPath);
        exec(`git checkout free} || git checkout -b free`);
        deleteFiles(['src/components', 'index.js', 'docs', 'router/index.js'], repoPath);
        exec(`git add .`);
        exec(`git commit -m "Remove all docs&components"`);
        exec(`git pull origin dev`);
        log(`Repo ${repoName} up to date, on branch free`, SUCCESS)
    } catch (err) {
        log(`An error occurred while updating repos ⚠️`, ERROR);
        log(stderr, ERROR);
    }

};

module.exports = checkoutToBranch;
