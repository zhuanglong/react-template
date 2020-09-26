const webpack = require('webpack');
const merge = require('webpack-merge');

const { distPath } = require('./paths');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',

    devtool: false, // 'cheap-module-source-map'

    plugins: [
        new webpack.HashedModuleIdsPlugin()
    ]
};

module.exports = merge(commonConfig, prodConfig);