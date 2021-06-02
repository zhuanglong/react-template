> 基于个人搭建的脚手架 [react-template](https://github.com/zhuanglong/react-template) 开发。

[项目地址](https://github.com/zhuanglong/react-template/tree/h5_material-ui)

## 使用 Material-UI

安装 `yarn add @material-ui/core @material-ui/icons`、`yarn add -D babel-plugin-import`。

- `@material-ui/icons` material 风格图标库，如果不喜欢可以不装。
- `babel-plugin-import` 用于按需加载组件。

.babelrc plugins 增加：

参考 [最小化打包文件大小](https://material-ui.com/zh/guides/minimizing-bundle-size/#development-environment)

```js
"plugins": [
    ...
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/core",
        // Use ""libraryDirectory": ""," if your bundler does not support ES modules
        "libraryDirectory": "esm",
        "camel2DashComponentName": false
      },
      "core"
    ],
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/icons",
        // Use ""libraryDirectory": ""," if your bundler does not support ES modules
        "libraryDirectory": "esm",
        "camel2DashComponentName": false
      },
      "icons"
    ]
  ]
```

index.html 添加：

```html
<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
```

src\theme\index.js，用于初始化主题配置，国际化等，

```js
import React from 'react';
import { red } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
}, zhCN);

function ThemeProviderPro(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default ThemeProviderPro;
```

然后在入口处包裹组件即可。

```js
<ThemeProviderPro><App /></ThemeProviderPro>
```

## 总结

- 缺少常用组件，如 Toast、Pull(上拉加载下拉刷新)、SwipAction(滑动操作)，轮播图。

- 一些弹框组件，比如 Dialog、Snackbar、Backdrop，需要维护状态来控制打开或关闭，没有像 AntD 那样提供 [静态方法](https://ant.design/components/message-cn/#API) 调用，AntD 还能在组建外调用，比如 Message 组件。
- Material-UI 提倡 CSS-in-JS，组件库的样式都是写在 js 中，按需插入 `<head>` 标签中，所以就不能将样式打包进 `.css`。  [为什么要使用 Material-UI 的样式方案呢？](https://material-ui.com/zh/styles/basics/#why-use-material-uis-styling-solution)
