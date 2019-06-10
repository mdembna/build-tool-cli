const fs = require('fs-extra');
const createZip = require('../setup/createZip');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { VU_PLUGINS, VU_PRO, VU_SUPER, VU_ADMIN } = require('../constans/packages-types');
const rootDir = require('../helpers/rootPath');

const vuSuperBundle = async (version, pluginPackVersion) => {
    const filesToCopy = [`${VU_PLUGINS}-${pluginPackVersion}.zip`, `${VU_PRO}-${version}.zip`, `${VU_ADMIN}-${version}.zip`];
    const pathToTargetDir = path.join(rootDir, 'repos', VU_SUPER)
    const zipName = `${VU_SUPER}-${version}`;

    fs.ensureDirSync(pathToTargetDir);
    copyFiles(filesToCopy, rootDir, pathToTargetDir);
    await createZip(VU_SUPER, zipName);
};

module.exports = vuSuperBundle;
