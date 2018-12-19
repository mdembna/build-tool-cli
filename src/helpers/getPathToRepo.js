const path = require('path');
const root = require('./rootPath');

const getPathToRepo = repoName => path.resolve(root, 'repos', repoName);

module.exports = getPathToRepo;
