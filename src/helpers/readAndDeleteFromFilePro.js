
const readline = require('readline');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const readAndDeleteFromFilePro = async (filesToEdit, targetRepoPath, baseRepoPath, ver) => {

    return Promise.all(filesToEdit.map(file => {

        return new Promise((resolve, reject) => {
            const readPath = path.join(baseRepoPath, file);
            const splitFile = file.split('.');
            const writePath = path.join(targetRepoPath, `${splitFile[0]}_edit.${splitFile[1]}`);

            fse.copySync(readPath, writePath);

            const readStream = fs.createReadStream(writePath);
            const writeStream = fs.createWriteStream(readPath);

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
                fse.remove(writePath, (err) => {
                    if (err) throw err;
                })
                resolve()
            })
        })

    })

    )

}

module.exports = readAndDeleteFromFilePro;