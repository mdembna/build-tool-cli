const fs = require('fs-extra');
const createZip = require('../setup/createZip');
const copyFiles = require('../helpers/copyFiles');
const path = require('path');
const { RE_ADMIN, RE_PRO, RE_BOUNDLE } = require('../constans/packages-types');
const rootDir = require('../helpers/rootPath');

const reBoundle = async () => {
    const filesToCopy = [`${RE_ADMIN}.zip`, `${RE_PRO}.zip`];
    const pathToTargetDir = path.join(rootDir, 'repos', RE_BOUNDLE)

    fs.ensureDirSync(pathToTargetDir);
    copyFiles(filesToCopy, rootDir, pathToTargetDir);
    await createZip(RE_BOUNDLE, RE_BOUNDLE);
};

module.exports = reBoundle;
