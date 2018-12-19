const root = require('./rootPath');
const getPathToRepo = require('./getPathToRepo');
const path = require('path');

const getLastVersionNumber = repoName => {
    const { version } = require(path.resolve(getPathToRepo(repoName), 'package.json'));
    return version;
}

module.exports = getLastVersionNumber;