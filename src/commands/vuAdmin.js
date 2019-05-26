const build = require('../helpers/build');
const fs = require('fs-extra');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const replaceStringInFile = require('../helpers/replaceStringInFile');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { VU_ADMIN } = require('../constans/packages-types');

const vuAdmin = async ({ version, lastVersionNumber }) => {
    const baseRepoName = 'vu-pro';
    const targetRepoName = 'mdbvue-admin-pro';
    const baseRepoPath = getPathToRepo(baseRepoName);
    const targetRepoPath = getPathToRepo(targetRepoName);
    const targetRepoFilesToUpdate = repositories[targetRepoName].filesToUpdate;
    const targetRepoFilesToBumpVersion = repositories[targetRepoName].bumpVersion;
    const zipName = `${VU_ADMIN}-${version}`;

    copyFiles(targetRepoFilesToUpdate, path.join(baseRepoPath, 'src'), path.join(targetRepoPath, 'mdbvue', 'src'));
    copyFiles(['./package.json', './README.md'], baseRepoPath, path.join(targetRepoPath, 'mdbvue'));
    copyFiles(['css', 'img'], path.join(baseRepoPath, 'build'), path.join(targetRepoPath, 'mdbvue', 'build'));
    fs.copySync(path.join(baseRepoPath, 'build', 'scss'), path.join(targetRepoPath, 'mdbvue', 'build', 'scss') );

    replaceStringInFile(
        targetRepoFilesToBumpVersion,
        targetRepoPath,
        lastVersionNumber,
        version
    );

    build(path.join(targetRepoPath, 'mdbvue'));

    await createZip(targetRepoName, zipName);
};

module.exports = vuAdmin;
