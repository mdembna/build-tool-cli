const path = require('path');
const root = require('./rootPath');

const getPath = dir => path.resolve(root, dir);

module.exports = getPath;
