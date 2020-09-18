const merge = require('webpack-merge');
const { distPath } = require('./paths');
const commonConfig = require('./webpack.common');

const devConfig = {
    // https://webpack.docschina.org/configuration/mode/
    // none，不使用 webpack 的默认配置
    mode: 'none',

    devServer: {
        contentBase: distPath,
        port: 8080,
        open: true, // 自动打开浏览器
        compress: true, // 启用 gzip 压缩
        hot: true,
        historyApiFallback: true
    }
};

module.exports = merge(commonConfig, devConfig);