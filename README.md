> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[项目源码](https://github.com/zhuanglong/react-template/tree/antd)

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

**<font color="red">为什么要排除？</font>**

>因为该配置有 CSS 模块化处理，不排除会导致 antd 的样式失效。

再复制当前 less loader 配置，`exclude: [/antd/]` 改为 `include: [/antd/]`，这样只处理 antd 的样式。

删除 css-loader options 配置，删除 postcss-loader，less-loader options 增加。

```js
  const { getThemeVariables } = require('antd/dist/theme');
  ...
  options: {
    lessOptions: {
      modifyVars: {
        // https://ant.design/docs/react/customize-theme-cn
        // ...getThemeVariables({
        //   dark: true, // 开启暗黑模式
        //   compact: true // 开启紧凑模式
        // }),
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
            // ...getThemeVariables({
            //   dark: true, // 开启暗黑模式
            //   compact: true // 开启紧凑模式
            // }),
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

class XPage extends React.Component {
  render() {
    return <Button type="primary">Antd Design Button</Button>;
  }
}
```

![](https://gitee.com/zloooong/image_store/raw/master/img/20210519152744.png)

## 页面样式闪烁？

如下场景：

只在 src\pages\CounterState\index.js 使用了 Button 组件，该页面是懒加载页面，所以样式是在页面加载好再添加上 antd 的样式，导致闪烁。

解决：

在入口处添加 antd 基础样式即可：

````js
import 'antd/lib/style/index.less';
````

经测试，打包大小是一样的。

## 参考

- [在 create-react-app 中定制主题](https://ant.design/docs/react/customize-theme-cn#%E5%9C%A8-create-react-app-%E4%B8%AD%E5%AE%9A%E5%88%B6%E4%B8%BB%E9%A2%98)
- [使用暗黑主题和紧凑主题](https://ant.design/docs/react/customize-theme-cn#%E5%9C%A8-create-react-app-%E4%B8%AD%E5%AE%9A%E5%88%B6%E4%B8%BB%E9%A2%98)
