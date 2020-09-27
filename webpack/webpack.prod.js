const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = require('./webpack.common');

const prodConfig = {
    devtool: false, // 'cheap-module-source-map'

    plugins: [
        new CleanWebpackPlugin()
    ]
};

module.exports = merge(commonConfig, prodConfig);