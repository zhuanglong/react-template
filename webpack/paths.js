const path = require('path');

const ROOT_PATH = process.cwd();
const SRC_PATH = path.join(ROOT_PATH, 'src');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');

module.exports = {
  ROOT_PATH,
  SRC_PATH,
  DIST_PATH,
  PUBLIC_PATH
};
