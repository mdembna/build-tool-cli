const fs = require('fs');
const rootDir = require('../helpers/rootPath');
const archiver = require('archiver');
const path = require('path');

const zipDirectory = (repoName, zipName) => {
  return new Promise((resolve, reject) => {
    const zipPath = path.join(rootDir, `${zipName}.zip`);
    const outputFile = fs.createWriteStream(zipPath);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.pipe(outputFile);
    archive.glob(
      '**/*',
      {
        cwd: path.join(rootDir, `repos/${repoName}`),
        ignore: ['**/.git/**', '.gitignore', '**/node_modules/**'],
        dot: true
      },
      {}
    );

    outputFile.on('close', () => {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized.');
      resolve();
    });

    archive.on('error', err => {
      throw err;
    });

    archive.finalize();
  });
};

module.exports = zipDirectory;
