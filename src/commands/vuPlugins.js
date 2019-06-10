const fs = require('fs-extra');
const fileSys = require('fs');
const createZip = require('../setup/createZip');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { VU_PLUGINS } = require('../constans/packages-types');
const rootDir = require('../helpers/rootPath');

const vuPlugins = async (version) => {
    const pluginsPath = path.join(rootDir, 'plugins');
    const pathToTargetDir = path.join(rootDir, 'repos', VU_PLUGINS);
    const zipName = `${VU_PLUGINS}-${version}`;
    const filesToCopy = [];
    fileSys.readdir(pluginsPath, (err, files) => {
      if (err) {
        return console.log('Unable to get plugins files ' + err);
      }
      files.forEach(file => {
        filesToCopy.push(file)
      });
      fs.ensureDirSync(pathToTargetDir);
      copyFiles(filesToCopy, pluginsPath, pathToTargetDir);
      createZip(VU_PLUGINS, zipName);
    })
};

module.exports = vuPlugins;
