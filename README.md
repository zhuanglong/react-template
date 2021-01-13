> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/antd)

## 使用 antd

安装 `npm i antd`、`npm i -D babel-plugin-import`。

> babel-plugin-import 用于按需引入 antd 组件。

.babelrc plugins 增加，

```json
"plugins": [
    ...
    [
      "import",
      {
        "libraryName": "antd",
        "style": true // true 为项目编译阶段，可以对引入的 antd 样式文件进行编译
      }
    ]
  ]
```

webpack.common.js rules 修改，

less loader 增加 `exclude: [/antd/]`，用于排除 antd 的样式。

<font color="red">为什么要排除？</font>因为该配置有 CSS 模块化处理，不排除会导致 antd 的样式失效。

再复制当前 less loader 配置，`exclude: [/antd/]` 改为 `include: [/antd/]`，这样只处理 antd 的样式。

删除 css-loader options 配置，

删除 postcss-loader，

less-loader options 增加。

```js
  options: {
    lessOptions: {
      modifyVars: {
        // https://ant.design/docs/react/customize-theme-cn
        'primary-color': '#1DA57A'
      },
      javascriptEnabled: true // 在 less 中使用 JavaScript 表达式
    }
  }
```

完成配置如下：

```js
  {
    test: /\.less$/i,
    exclude: [/antd/],
    use: [{
      loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    }, {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[folder]__[local]--[hash:8]'
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
    // 处理 antd 的样式
    test: /\.less$/i,
    include: [/antd/],
    use: [{
      loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    }, {
      loader: 'css-loader'
    }, {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: {
            // https://ant.design/docs/react/customize-theme-cn
            'primary-color': '#1DA57A'
          },
          javascriptEnabled: true // 在 less 中使用 JavaScript 表达式
        }
      }
    }]
  }
```

在页面引入使用。

```js
import { Button } from 'antd';

class Home extends React.Component {
  render() {
    return <Button type="primary">Antd Design Button</Button>;
  }
}
```