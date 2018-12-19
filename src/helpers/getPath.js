const path = require('path');
const root = require('./rootPath');

const getPath = dir => path.join(root, dir);

module.exports = getPath;
