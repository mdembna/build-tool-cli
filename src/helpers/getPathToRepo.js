const path = require('path');
const root = require('./rootPath');

const getPathToRepo = repoName => path.join(root, 'repos', repoName);

module.exports = getPathToRepo;
