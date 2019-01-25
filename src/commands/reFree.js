const build = require('../helpers/build');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const searchFileByExtension = require('../helpers/searchFileByExtension');
const deleteFiles = require('../helpers/deleteFiles');
const path = require('path');
const { RE_FREE } = require('../constans/packages-types');
const replaceStringInFile = require('../helpers/replaceStringInFile');


const checkoutToBranch = require('../setup/checkoutToBranch');
const commitChanges = require('../setup/commitChanges');
const copyEverythingFromDir = require('../helpers/copyEverythingFromDir');
const readAndDeleteFromFile = require('../helpers/readAndDeleteFromFile');
const copyFiles = require('../helpers/copyFiles');


const reFree = async ({ version, lastVersionNumber, commitMessage }) => {
    const baseRepoName = 're-pro';
    const packageRepoName = 'react-demo';
    const workingBranch = 'free-auto';
    const targetRepoName = 'React-Bootstrap-with-Material-Design';

    const baseRepoPath = getPathToRepo(baseRepoName);
    const targetRepoPath = getPathToRepo(targetRepoName);
    const packageRepoPath = getPathToRepo(packageRepoName);

    const dirToDelete = repositories[targetRepoName].dirToDelete;
    const filesToEdit = repositories[targetRepoName].filesToEdit;
    const targetRepoFilesToCopy = repositories[targetRepoName].filesToCopy;

    commitChanges(commitMessage ? commitMessage : `Generate version v.${version}`, baseRepoName);
    checkoutToBranch(baseRepoName, workingBranch, "auto-build-test");
    copyEverythingFromDir(baseRepoPath, targetRepoPath);
    deleteFiles(dirToDelete, targetRepoPath);
    await readAndDeleteFromFile(filesToEdit, targetRepoPath, baseRepoPath);

    build(targetRepoPath, true);

    commitChanges(commitMessage ? commitMessage : `Generate version v.${version}`, packageRepoName);
    checkoutToBranch(packageRepoName, workingBranch, "auto-version-update");
    const lastTgzPackage = searchFileByExtension(packageRepoPath, '.tgz');
    lastTgzPackage && deleteFiles(lastTgzPackage, packageRepoPath);

    replaceStringInFile(
        ["package.json"],
        packageRepoPath,
        `./mdbreact-${version}.tgz`,
        `${version}`
    );

    deleteFiles(['src/pages'], packageRepoPath);

    copyFiles(targetRepoFilesToCopy, path.join(targetRepoPath, "docs"), path.join(packageRepoPath, "src"));

    await createZip(packageRepoName, RE_FREE);
};

module.exports = reFree;
