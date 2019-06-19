const build = require('../helpers/build');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const replaceStringInFile = require('../helpers/replaceStringInFile');
const searchFileByExtension = require('../helpers/searchFileByExtension');
const copyFiles = require('../helpers/copyFiles');
const deleteFiles = require('../helpers/deleteFiles');
const commitChanges = require('../setup/commitChanges');
const path = require('path');
const { VU_PRO } = require('../constans/packages-types');

const vuPro = async ({ version, lastVersionNumber, commitMessage }) => {

  const baseRepoName = 'vu-pro';
  const baseRepoPath = getPathToRepo(baseRepoName);
  const baseRepoSrcPath = path.join(baseRepoPath, 'src');

  const targetRepoName = 'vue-demo';
  const targetRepoPath = getPathToRepo(targetRepoName);
  const targetRepoSrcPath = path.join(targetRepoPath, 'demo');

  const baseRepoFilesToEdit = repositories[baseRepoName].filesToEdit;
  const targetRepoFilesToEdit = repositories[targetRepoName].filesToEdit;

  const zipName = `${VU_PRO}-${version}`;

  replaceStringInFile(
    baseRepoFilesToEdit,
    baseRepoPath,
    lastVersionNumber,
    version
  );

  build(baseRepoPath, true);

  const lastTgzPackage = searchFileByExtension(targetRepoPath, '.tgz');
  lastTgzPackage && deleteFiles(lastTgzPackage, targetRepoPath);

  let newTgzPackage = searchFileByExtension(baseRepoPath, '.tgz');
  copyFiles(newTgzPackage, baseRepoPath, targetRepoPath);
  deleteFiles(newTgzPackage, baseRepoPath);
  commitChanges(commitMessage, baseRepoName);

  replaceStringInFile(
    targetRepoFilesToEdit,
    targetRepoPath,
    lastVersionNumber,
    version
  );
  
  deleteFiles(['App.vue', 'docs', 'main.js', 'router'], targetRepoSrcPath);
  copyFiles(['App.vue', 'docs', 'main.js', 'router'], baseRepoSrcPath, targetRepoSrcPath);

  replaceStringInFile(['main.js'], targetRepoSrcPath, "import Notify from './components/pro/Advanced/Notify.js';", "import { Notify } from 'mdbvue';");
  replaceStringInFile(['main.js'], targetRepoSrcPath, "import '../build/css/mdb.css';", "import 'mdbvue/build/css/mdb.css';");
  replaceStringInFile(['HomePage.vue'], path.join(targetRepoPath, 'demo', 'docs'), "../assets/logo-mdb-vue-small.png", "../../src/assets/logo-mdb-vue-small.png");
  commitChanges(commitMessage, targetRepoName);

  await createZip(targetRepoName, zipName);
};

module.exports = vuPro;
