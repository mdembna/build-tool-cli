const build = require('../helpers/build');
const { repositories } = require('../../config.json');
const getPathToRepo = require('../helpers/getPathToRepo');
const createZip = require('../setup/createZip');
const replaceStringInFile = require('../helpers/replaceStringInFile');
const searchFileByExtension = require('../helpers/searchFileByExtension');
const copyFiles = require('../helpers/copyFiles');
const deleteFiles = require('../helpers/deleteFiles');
const path = require('path');
const { VU_PRO } = require('../constans/packages-types');

const vuPro = async ({ version, lastVersionNumber }) => {
  //M
  const baseRepoName = 'vu-pro';
  const targetRepoName = 'vue-demo';
  //--
  const baseRepoPath = getPathToRepo(baseRepoName);
  // const baseRepoDocsPath = path.join(baseRepoPath, 'docs');
  const baseRepoSrcPath = path.join(baseRepoPath, 'src');

  const targetRepoPath = getPathToRepo(targetRepoName);
  const targetRepoSrcPath = path.join(targetRepoPath, 'demo');

  const baseRepoFilesToEdit = repositories[baseRepoName].filesToEdit;
  const targetRepoFilesToEdit = repositories[targetRepoName].filesToEdit;
  // const targetRepoFilesToCopy = repositories[targetRepoName].filesToCopy;

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

  await createZip(targetRepoName, zipName);
};

module.exports = vuPro;
