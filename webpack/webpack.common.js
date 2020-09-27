const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { srcPath, distPath, publicPath } = require('./paths');

// https://webpack.docschina.org/guides/production/#specify-the-mode
// https://github.com/webpack/webpack/issues/2537
// https://github.com/niexias/niexias.github.io/issues/7
const isDev = process.env.NODE_ENV === 'development';

const commonConfig = {
    // https://webpack.docschina.org/configuration/mode/
    mode: process.env.NODE_ENV,

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
        new webpack.DefinePlugin({
            // https://www.cnblogs.com/usebtf/p/9912413.html
            'process.env': {
                PUBLIC_PATH: JSON.stringify('/')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'react-template',
            filename: 'index.html',
            template: path.join(publicPath, 'index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(publicPath, 'favicon.ico'),
                to: path.join(distPath, 'favicon.ico')
            }]
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
                // https://webpack.docschina.org/loaders/css-loader/#pure-css-css-modules-and-postcss
                test: /\.less$/i,
                use: [{
                    loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
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
                    loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
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
    },

    optimization: {
        // named 对应旧的 new webpack.NamedModulesPlugin() // 当开启 HMR 的时候，该插件会显示模块的相对路径
        // hashed 对应旧的 new webpack.HashedModuleIdsPlugin()
        moduleIds: isDev ? 'named' : 'hashed',

        // 压缩 js
        // mode: 'production' 会默认开启压缩，所以这里无需重复配置
        // minimize: isDev,

        splitChunks: {
            cacheGroups: {
                verdor: {
                    test: /[\\/]node_modules[\\/]/, // 这样写也可以 path.join(process.cwd(), 'node_modules')
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }
};

module.exports = commonConfig;