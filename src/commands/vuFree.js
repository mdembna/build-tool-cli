const build = require('../helpers/build');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const searchFileByExtension = require('../helpers/searchFileByExtension');
const deleteFiles = require('../helpers/deleteFiles');
const path = require('path');
const { VU_FREE } = require('../constans/packages-types');
const replaceStringInFile = require('../helpers/replaceStringInFile');

const checkoutTheirs = require('../setup/checkoutTheirs');
const checkoutToBranch = require('../setup/checkoutToBranch');
const commitChanges = require('../setup/commitChanges');
const copyEverythingFromDir = require('../helpers/copyEverythingFromDir');
const readAndDeleteFromFile = require('../helpers/readAndDeleteFromFile');
const copyFiles = require('../helpers/copyFiles');
const compileScss = require('../helpers/compileScss');


const vuFree = async ({ version, lastVersionNumber, commitMessage }) => {
    const baseRepoName = 'vu-pro';
    const packageRepoName = 'vue-demo';
    const workingBranch = 'dev';
    const targetRepoName = 'Vue-Bootstrap-with-Material-Design';
    const jQueryRepoName = 'bootstrap-material-design';

    const baseRepoPath = getPathToRepo(baseRepoName);
    const targetRepoPath = getPathToRepo(targetRepoName);
    const packageRepoPath = getPathToRepo(packageRepoName);
    const jQueryRepoPath = getPathToRepo(jQueryRepoName);

    const dirToDelete = repositories[targetRepoName].dirToDelete;
    const filesToEdit = repositories[targetRepoName].filesToEdit;
    const targetRepoFilesToBumpVersion = repositories[targetRepoName].bumpVersion;
    const targetRepoFilesToCopy = repositories[targetRepoName].filesToCopy;
    const zipName = `${VU_FREE}-${version}`;

    // const removePro = /(<!-- removeIf(free) -->|// removeIf(free))(.*)(<!-- endRemoveIf(free) -->|// endRemoveIf(free)))/g;
    const removeProJS = /\/\/ removeIf\(free\).*?\/\/ endRemoveIf\(free\)/g;
    const removeProVue = /\<\!\-\- removeIf\(free\) \-\-\>.*?\<\!\-\- endRemoveIf\(free\) \-\-\>/g;

    commitChanges(commitMessage ? commitMessage : `Generate version v.${version}`, baseRepoName);
    deleteFiles(dirToDelete, baseRepoPath);
    replaceStringInFile(['src/main.js'], baseRepoPath, "import Notify from './components/pro/Advanced/Notify.js';", "");
    replaceStringInFile(['src/main.js'], baseRepoPath, /Vue\.use\(Notify\)\;/, "");
    replaceStringInFile(['src/index.js', 'src/router/index.js'], baseRepoPath, removeProJS, "");
    replaceStringInFile(filesToEdit, baseRepoPath, removeProVue, "");
    deleteFiles(['scss', 'css', 'img', 'font'], path.join(baseRepoPath, 'build'));
    copyFiles(['scss', 'img', 'font'], jQueryRepoPath, path.join(baseRepoPath, 'build'));
    compileScss(baseRepoName);
    
    // replaceStringInFile(
    //     targetRepoFilesToBumpVersion,
    //     targetRepoPath,
    //     lastVersionNumber,
    //     version
    // );
    
    // copyFiles(['docs', 'router', 'App.vue', 'main.js'], path.join(baseRepoPath, 'src'), path.join(targetRepoPath, 'src'));


    // await readAndDeleteFromFile(filesToEdit, baseRepoPath, baseRepoPath);

    // build(targetRepoPath, true);

    // commitChanges(commitMessage ? commitMessage : `Generate version v.${version}`, packageRepoName);
    // checkoutToBranch(packageRepoName, workingBranch, "auto-version-update");
    // const lastTgzPackage = searchFileByExtension(packageRepoPath, '.tgz');
    // lastTgzPackage && deleteFiles(lastTgzPackage, packageRepoPath);

    // replaceStringInFile(
    //     ["package.json"],
    //     packageRepoPath,
    //     `./mdbreact-${version}.tgz`,
    //     `${version}`
    // );

    // deleteFiles(['src/pages'], packageRepoPath);

    // copyFiles(targetRepoFilesToCopy, path.join(targetRepoPath, "docs"), path.join(packageRepoPath, "src"));

    await createZip(packageRepoName, zipName);
};

module.exports = vuFree;