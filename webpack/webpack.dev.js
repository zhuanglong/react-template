const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize } = require('webpack-merge');

const { DIST_PATH, SRC_PATH } = require('./paths');
const commonConfig = require('./webpack.common');

const devConfig = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      // 'react-hot-loader/patch' // 貌似没什么作用
      path.join(SRC_PATH, 'index.js')
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
    contentBase: DIST_PATH,
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

module.exports = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === 'entry.app') { // entry.app 不合并，全替换
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
