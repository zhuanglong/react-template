> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/animation)

webpack\webpack.dev.js，新增 loader

> `animate.css`，不需要 CSS 模块化等处理

```js
{
    test: /animate.css/,
    use: [{
        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    }, {
        loader: 'css-loader'
    }]
}
```

- 1
![](https://gitee.com/zloooong/image_store/raw/master/img/20210406185422.gif)

- 2
![](https://gitee.com/zloooong/image_store/raw/master/img/20210406185434.gif)

- 3
![](https://gitee.com/zloooong/image_store/raw/master/img/20210406185444.gif)

- 4
![](https://gitee.com/zloooong/image_store/raw/master/img/20210406185453.gif)
