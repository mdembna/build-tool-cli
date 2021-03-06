const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const deleteFiles = require('../helpers/deleteFiles');
const path = require('path');
const { VU_FREE } = require('../constans/packages-types');
const replaceStringInFile = require('../helpers/replaceStringInFile');

const pullChanges = require('../setup/pullChanges');
const switchBranch = require('../setup/switchBranch');
const commitChanges = require('../setup/commitChanges');
const copyFiles = require('../helpers/copyFiles');
const compileScss = require('../helpers/compileScss');
const buildLib = require('../helpers/buildLib');


const vuFree = async ({ version, lastVersionNumber, commitMessage }) => {
    const baseRepoName = 'vu-pro';
    const packageRepoName = 'vue-demo';
    const targetRepoName = 'Vue-Bootstrap-with-Material-Design';
    const jQueryRepoName = 'bootstrap-material-design';

    const baseRepoPath = getPathToRepo(baseRepoName);
    const targetRepoPath = getPathToRepo(targetRepoName);
    const packageRepoPath = getPathToRepo(packageRepoName);
    const jQueryRepoPath = getPathToRepo(jQueryRepoName);

    const dirToDelete = repositories[targetRepoName].dirToDelete;
    const filesToEdit = repositories[targetRepoName].filesToEdit;
    const filesToBumpVersion = repositories[targetRepoName].bumpVersion;
    const zipName = `${VU_FREE}-${version}`;
    const filesToCopy = repositories[targetRepoName].filesToCopy;

    // const removePro = /(<!-- removeIf(free) -->|// removeIf(free))(.*)(<!-- endRemoveIf(free) -->|// endRemoveIf(free)))/g;
    const removeProJS = /\/\/ removeIf\(free\).*?\/\/ endRemoveIf\(free\)/g;
    const removeProVue = /\<\!\-\- removeIf\(free\) \-\-\>.*?\<\!\-\- endRemoveIf\(free\) \-\-\>/g;

    //vu-pro
    pullChanges(baseRepoName, 'dev', 'free', true);
    deleteFiles(dirToDelete, baseRepoPath);
    //removing pro imports
    replaceStringInFile(
        filesToBumpVersion,
        baseRepoPath,
        lastVersionNumber,
        version
    );
    replaceStringInFile(['src/main.js'], baseRepoPath, "import Notify from './components/pro/Advanced/Notify.js';", "");
    replaceStringInFile(['src/main.js'], baseRepoPath, /Vue\.use\(Notify\)\;/, "");
    replaceStringInFile(['src/index.js', 'src/router/index.js'], baseRepoPath, removeProJS, "");
    replaceStringInFile(filesToEdit, baseRepoPath, removeProVue, "");
    deleteFiles(['scss', 'css', 'img', 'font'], path.join(baseRepoPath, 'build'));

    copyFiles(['scss', 'img', 'font'], jQueryRepoPath, path.join(baseRepoPath, 'build'));
    compileScss(baseRepoName);
    commitChanges(commitMessage, baseRepoName);
    //vue-demo
    switchBranch(packageRepoName, 'free');
    deleteFiles(['App.vue', 'docs', 'router', 'index.js'], path.join(packageRepoPath, 'demo'));
    copyFiles(['App.vue', 'docs', 'router', 'index.js'], path.join(baseRepoPath, 'src'), path.join(packageRepoPath, 'demo'));
    replaceStringInFile(
        filesToBumpVersion,
        packageRepoPath,
        lastVersionNumber,
        version
    );
    replaceStringInFile(['main.js'], path.join(packageRepoPath, 'demo'), 'import ../build/css/mdb.css',  'mdbvue/build/css/mdb.css');
    replaceStringInFile(['HomePage.vue'], path.join(packageRepoPath, 'demo', 'docs'), "../assets/logo-mdb-vue-small.png", "../../src/assets/logo-mdb-vue-small.png");
    commitChanges(commitMessage, packageRepoName);
    //github
    switchBranch(targetRepoName, 'master');
    deleteFiles(['src'], targetRepoPath);
    copyFiles(filesToCopy, baseRepoPath, targetRepoPath);
    buildLib(targetRepoName);
    commitChanges(commitMessage, targetRepoName);
    
    await createZip(packageRepoName, zipName);
};

module.exports = vuFree;