const { cd, exec } = require('shelljs');

const build = repoDir => {

    cd(repoDir);
    exec('npm install');
    exec('npm run build', { silent: true });
    exec('npm pack');
    cd('..');


};

module.exports = build;
