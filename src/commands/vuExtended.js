const fs = require('fs-extra');
const createZip = require('../setup/createZip');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { VU_PLUGINS, VU_PRO, VU_EXTENDED } = require('../constans/packages-types');
const rootDir = require('../helpers/rootPath');

const vuExtended = async (version, pluginPackVersion) => {
    const filesToCopy = [`${VU_PLUGINS}-${pluginPackVersion}.zip`, `${VU_PRO}-${version}.zip`];
    const pathToTargetDir = path.join(rootDir, 'repos', VU_EXTENDED)
    const zipName = `${VU_EXTENDED}-${version}`;

    fs.ensureDirSync(pathToTargetDir);
    copyFiles(filesToCopy, rootDir, pathToTargetDir);
    await createZip(VU_EXTENDED, zipName);
};

module.exports = vuExtended;
