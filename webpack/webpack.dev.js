const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { distPath, srcPath } = require('./paths');
const commonConfig = require('./webpack.common');

const devConfig = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      path.join(srcPath, 'index.js')
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin()
  ],

  devServer: {
    contentBase: distPath,
    port: 8080,
    open: false, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩
    hot: true,
    historyApiFallback: true,
    proxy: {
      // http://localhost:7001/api/getList => http://localhost:7001/getList
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: { '^/api': '' },
        changeOrigin: true // target 是域名的话，需要这个参数
      }
    }
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
