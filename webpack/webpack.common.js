const path = require('path');
const { srcPath, distPath } = require('./paths');

const commonConfig = {
    entry: {
        app: [
            path.join(srcPath, 'index.js')
        ]
    },

    output: {
        path: distPath,
        filename: 'bundle.js'
    },

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
                test: /\.css$/i,
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
                }]
            }
        ]
    }
};

module.exports = commonConfig;