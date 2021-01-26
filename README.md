> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/rem-layout)

移动端布局推荐 [hotcss](https://github.com/imochen/hotcss)

## 用法

**下载后放在 utils 目录**

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118181432.png)

**根据 UI 稿设置**

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118181602.png)

**Less 用法**

>注意：如果使用 less，则需要引入 less-plugin-functions，普通的 less 编译工具无法正常编译。

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118181952.png)

**Sass 用法**

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118182200.png)

**优化项，自动 @import 样式**

> 在项目会存在多个样式文件，每次都要引入，可利用 loader additionalData 在编译时自动引入。

[webpack 文档](https://webpack.docschina.org/loaders/less-loader/#additionaldata)

在 webpack\webpack.common.js 增加

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118183436.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118184718.png)

这样就可以不用 import px2rem 也能够使用 px2rem() 函数。

**在 JS 中调用**

src\index.js

![](https://gitee.com/zloooong/image_store/raw/master/img/20210119104045.png)

```
style={{ width: `${hotcss.px2rem(150)}rem` }}
```

![](https://gitee.com/zloooong/image_store/raw/master/img/20210119104730.png)