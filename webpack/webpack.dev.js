const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const { distPath, srcPath } = require('./paths');
const commonConfig = require('./webpack.common');

const devConfig = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      // 'react-hot-loader/patch' // 貌似没什么作用
      path.join(srcPath, 'index.js')
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    alias: {
      // 去除控制台"React-Hot-Loader:..."警告
      // https://github.com/gaearon/react-hot-loader/issues/1227#issuecomment-482139583
      'react-dom': '@hot-loader/react-dom'
    }
  },

  devServer: {
    contentBase: distPath,
    port: 8080,
    open: false, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩
    hot: true,
    historyApiFallback: true
  }
};

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') { // entry.app 不合并，全替换
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
