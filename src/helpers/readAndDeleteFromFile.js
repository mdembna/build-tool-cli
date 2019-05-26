
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

            const startMarkerInVue = '<!-- removeIf(free) -->';
            const startMarkerInJS = '// removeIf(free)';
            const endMarkerInVue = '<!-- endRemoveIf(free) -->';
            const endMarkerInJS = '// endRemoveIf(free)';
            let deleteEnabled = false;


            rl.on('line', function (line) {
                if (!deleteEnabled && line.includes(startMarkerInVue) || line.includes(startMarkerInJS)) {
                    deleteEnabled = true;
                } else if (deleteEnabled && line.includes(endMarkerInVue) || line.includes(endMarkerInJS)) {
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