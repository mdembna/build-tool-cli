
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const readAndDeleteFromFile = async (filesToEdit, targetRepoPath, baseRepoPath) => {

    return Promise.all(filesToEdit.map( file => {

        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(path.join(baseRepoPath, file));
            const writeStream = fs.createWriteStream(path.join(targetRepoPath, file));

            const rl = readline.createInterface({
                input: readStream,
                // output: writeStream,
                terminal: false
            });

            const startMarkerInJSX = '{/* PRO-START */}';
            const startMarkerInJS = '// PRO-START';
            const endMarkerInJSX = '{/* PRO-END */}';
            const endMarkerInJS = '// PRO-END';
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

        })

    )

}

module.exports = readAndDeleteFromFile;