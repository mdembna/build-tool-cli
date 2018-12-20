const { cd, exec } = require('shelljs');

const build = (repoDir, pack = false) => {
  cd(repoDir);
  exec('npm install');
  exec('npm run build', { silent: true });
  pack && exec('npm pack');
};

module.exports = build;
