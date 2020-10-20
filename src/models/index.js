const context = require.context('./', false, /\.js$/); // false 表示不遍历文件夹

const models = context
  .keys()
  .filter((model) => model !== './index.js') // 过滤 index.js
  .map((model) => context(model)); // 获取所有的 model 包含到 context 中去

export default models;
