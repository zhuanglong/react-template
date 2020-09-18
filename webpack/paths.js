const path = require('path');

const srcPath = path.join(process.cwd(), 'src');
const distPath = path.join(process.cwd(), 'dist');

module.exports = {
    srcPath,
    distPath
};