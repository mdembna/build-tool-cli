const fs = require('fs-extra');
const createZip = require('../setup/createZip');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { VU_ADMIN, VU_PRO, VU_BUNDLE } = require('../constans/packages-types');
const rootDir = require('../helpers/rootPath');

const vuBundle = async (version) => {
    const filesToCopy = [`${VU_ADMIN}-${version}.zip`, `${VU_PRO}-${version}.zip`];
    const pathToTargetDir = path.join(rootDir, 'repos', VU_BUNDLE)
    const zipName = `${VU_BUNDLE}-${version}`;

    fs.ensureDirSync(pathToTargetDir);
    copyFiles(filesToCopy, rootDir, pathToTargetDir);
    await createZip(VU_BUNDLE, zipName);
};

module.exports = vuBundle;
