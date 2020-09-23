const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { srcPath, distPath, publicPath } = require('./paths');

const commonConfig = {
    entry: {
        app: [
            path.join(srcPath, 'index.js')
        ]
    },

    output: {
        path: distPath,
        filename: '[name].[hash].js', // name 是入口名称
        chunkFilename: '[name].[chunkhash].js' // name 是从 /* webpackChunkName: "xxPage" */ 中取的
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-template',
            filename: 'index.html',
            template: path.join(publicPath, 'index.html')
        })
    ],

    resolve: {
        alias: {
            '@': srcPath
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: srcPath,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true // 缓存编译结果，下次编译加速
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 // 小于 8kb 的图片转换为 base64 编码
                    }
                }]
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: 'style-loader'
                }, {
                    // https://zhuanlan.zhihu.com/p/20495964?columnSlug=purerender
                    // https://github.com/rails/webpacker/issues/2197#issuecomment-517234086
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[folder]__[local]--[hash:5]'
                        }
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env']
                        }
                    }
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[folder]__[local]--[hash:5]'
                        }
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env']
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    }
};

module.exports = commonConfig;