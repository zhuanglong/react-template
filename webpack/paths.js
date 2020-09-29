const path = require('path');

const srcPath = path.join(process.cwd(), 'src');
const distPath = path.join(process.cwd(), 'dist');
const publicPath = path.join(process.cwd(), 'public');

module.exports = {
  srcPath,
  distPath,
  publicPath
};
