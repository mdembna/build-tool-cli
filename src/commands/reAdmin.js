const build = require('../helpers/build');
const fs = require('fs-extra');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const replaceStringInFile = require('../helpers/replaceStringInFile');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { RE_ADMIN } = require('../constans/packages-types');

const reAdmin = async ({ version, lastVersionNumber }) => {
    const baseRepoName = 're-pro';
    const targetRepoName = 'mdb-react-admin-pro';

    const baseRepoPath = getPathToRepo(baseRepoName);
    const targetRepoPath = getPathToRepo(targetRepoName);
    const targetRepoFilesToUpdate = repositories[targetRepoName].filesToUpdate;
    const targetRepoFilesToBumpVersion = repositories[targetRepoName].bumpVersion;


    copyFiles(targetRepoFilesToUpdate, path.join(baseRepoPath, 'src'), path.join(targetRepoPath, 'mdbreact', 'src'));
    fs.copySync(path.join(baseRepoPath, 'dist/scss'), path.join(targetRepoPath, 'mdbreact/dist/scs') );

    replaceStringInFile(
        targetRepoFilesToBumpVersion,
        targetRepoPath,
        lastVersionNumber,
        version
    );

    build(path.join(targetRepoPath, 'mdbreact'));

    await createZip(targetRepoName, RE_ADMIN);
};

module.exports = reAdmin;
