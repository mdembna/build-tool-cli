
const readline = require('readline');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const readAndDeleteFromFile = async (filesToEdit, repoPath, ver) => {

    return Promise.all(filesToEdit.map(file => {
        const readPath = path.join(repoPath, file);
        const splitFile = file.split('.');
        const writePath = path.join(repoPath, `${splitFile[0]}_edit.${splitFile[1]}`);

        const writeToEdit = new Promise((resolve, reject) => {
            fse.copy(readPath, writePath, (err) => {
                if (err) throw err;
            })

            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(writePath);

            const rl = readline.createInterface({
                input: readStream,
                // output: writeStream,
                terminal: false
            });

            const startMarkerInJSX = `{/* ${ver}-START */}`;
            const startMarkerInJS = `// ${ver}-START`;
            const endMarkerInJSX = `{/* ${ver}-END */}`;
            const endMarkerInJS = `// ${ver}-END`;

            let deleteEnabled = false;

            rl.on('line', function (line) {
                if (!deleteEnabled && line.includes(startMarkerInJSX) || line.includes(startMarkerInJS)) {
                    deleteEnabled = true;
                } else if (deleteEnabled && line.includes(endMarkerInJSX) || line.includes(endMarkerInJS)) {
                    deleteEnabled = false;
                    return;
                }

                if (!deleteEnabled) {
                    writeStream.write(line + '\n');
                }
            }).on('close', () => {
                writeStream.close()
                resolve()
            })

        })

        writeToEdit.then(() => {
            fse.copy(writePath, readPath, (err) => {
                if (err) throw err;
            })
            fse.remove(writePath, (err) => {
                if (err) throw err;
            })
        })
    }))

}

module.exports = readAndDeleteFromFile;