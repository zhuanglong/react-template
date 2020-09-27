const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');

const prodConfig = {
    devtool: false, // 'cheap-module-source-map'

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[chunkhash].css'
        }),
        new CleanWebpackPlugin()
    ]
};

module.exports = merge(commonConfig, prodConfig);