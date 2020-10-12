const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./webpack.common');

const prodConfig = {
  devtool: false, // 'source-map'

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],

  optimization: {
    // 压缩 js
    // mode 为 'production' 会默认开启压缩，这里无需重复配置
    // minimize: true,

    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsWebpackPlugin({})]
  }
};

module.exports = merge(commonConfig, prodConfig);
