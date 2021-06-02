# 从零搭建 React 项目开发环境

旨在学习 Webpack 相关配置及插件的使用，个人自用的 React 脚手架，基于该脚手架继续扩展 React 周边技术（分支可见）。

[源码](https://github.com/zhuanglong/react-template)

## 目录

- <a href="#init 项目">init 项目</a>
- <a href="#webpack">webpack</a>
- <a href="#命令优化">命令优化</a>
- <a href="#babel">babel</a>
- <a href="#react">react</a>
- <a href="#react-router">react-router</a>
- <a href="#webpack-dev-serve">webpack-dev-server</a>
- <a href="#模块热替换(Hot Module Replacement)">模块热替换(Hot Module Replacement)</a>
- <a href="#优化文件路径">优化文件路径</a>
- <a href="#devtool 优化">devtool 优化</a>
- <a href="#编译图片">编译图片</a>
- <a href="#编译 CSS">编译 CSS</a>
- <a href="#CSS 模块化">CSS 模块化</a>
- <a href="#样式自动补全">样式自动补全</a>
- <a href="#Less">Less</a>
- <a href="#Sass">Sass</a>
- <a href="#请求代理 Proxy">请求代理 Proxy</a>
- <a href="#按需加载">按需加载</a>
- <a href="#缓存">缓存</a>
- <a href="#html-webpack-plugin">html-webpack-plugin</a>
- <a href="#提取公共代码">提取公共代码</a>
- <a href="#生成环境构建">生成环境构建</a>
- <a href="#打包优化">打包优化</a>
- <a href="#扩展">扩展</a>
  - <a href="#打包体积可视化分析">打包体积可视化分析</a>
  - <a href="#支持装饰器">支持装饰器</a>
  - <a href="#解决在 class 中定义静态属性的问题">解决在 class 中定义静态属性的问题</a>
  - <a href="#Webpack 配置全局变量">Webpack 配置全局变量</a>
  - <a href="#分离 CSS 文件导致资源路径错误">分离 CSS 文件导致资源路径错误</a>
  - <a href="#优化编译信息在控制台的显示效果">优化编译信息在控制台的显示效果</a>

## <a id="init 项目">init 项目</a>

运行 `npm init`，然后得到一个 `package.json` 文件。

## <a id="webpack">webpack</a>

`npm i --save-dev webpack@4 webpack-cli webpack-merge@5`

> webpack-merge 用于合并配置文件。

**创建以下文件用于配置 webpack。**

webpack\paths.js

```js
const path = require('path');

const SRC_PATH = path.join(process.cwd(), 'src');
const DIST_PATH = path.join(process.cwd(), 'dist');
const PUBLIC_PATH = path.join(process.cwd(), 'public');

module.exports = {
    SRC_PATH,
    DIST_PATH,
    PUBLIC_PATH
};
```

webpack\webpack.common.js

```js
const path = require('path');
const { SRC_PATH, DIST_PATH } = require('./paths');

const commonConfig = {
    entry: {
        app: [
            path.join(SRC_PATH, 'index.js')
        ]
    },

    output: {
        path: DIST_PATH,
        filename: 'bundle.js'
    }
};

module.exports = commonConfig;
```

webpack\webpack.dev.js

```js
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    // https://webpack.docschina.org/configuration/mode/
    // none，不使用 webpack 的默认配置
    mode: 'none'
};

module.exports = merge(commonConfig, devConfig);
```

入口文件 src\index.js

```js
document.getElementById('app').innerText = 'Hello Webpack';
```

dist\index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>react-template</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="bundle.js"></script>
    </body>
</html>
```

**执行编译**

`node_modules/.bin/webpack --config webpack/webpack.dev.js`

编译成功后可以在 dist 目录看到一个 bundle.js 文件，用浏览器打开 index.html 查看效果。

> wenpack 的作用就是把 index.js 处理后生成 bundle.js。

## <a id="命令优化">命令优化</a>

每次编译都要输入命令，比较麻烦，我们可以把命令写到 package.json。

```json
"scripts": {
    "start": "webpack --config webpack/webpack.dev.js"
},
```

这样执行 `npm start` 命令就可以编译了。

## <a id="babel">babel</a>

文档[看这里](https://webpack.docschina.org/loaders/babel-loader/)

`npm i -D babel-loader @babel/core @babel/preset-env`

修改 webpack\webpack.common.js, 增加 module。

```js
const path = require('path');
const { SRC_PATH, DIST_PATH } = require('./paths');

const commonConfig = {
    entry: {
        app: [
            path.join(SRC_PATH, 'index.js')
        ]
    },

    output: {
        path: DIST_PATH,
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            include: SRC_PATH,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'], // 转化为 es5
                    cacheDirectory: true // 缓存编译结果，下次编译加速
                }
            }]
        }]
    }
};

module.exports = commonConfig;
```

**执行编译**

前后对比，可以看到 es6 代码转成了 es5。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200918162134.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20200918162236.png)

**优化**

其实可以把 `presets` 属性放到 `.babelrc` 文件中。

新建 `.babelrc`

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

然后删除 webpack.common.js 中的 presets: ['@babel/preset-env']。

## <a id="react">react</a>

`npm i react@16 react-dom`

新建 src\pages\Home\index.js，

```js
import React from 'react';

class Home extends React.Component {
    render() {
        return <div>Home Page</div>;
    }
}

export default Home;
```

修改 src\index.js，

```js
import React from 'react';

class Home extends React.Component {
    render() {
        return <div>Home Page</div>;
    }
}

export default Home;
```

执行编译，你会发现如下报错。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200918164412.png)

这是因为不支持 react `jsx` 语法导致的，安装一个 babel 插件就能搞定。

`npm i -D @babel/preset-react`

修改 .babelrc，

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

重新执行编译查看效果。

## <a id="react-router">react-router</a>

`npm i react-router-dom@5`

上一节我们已经创建了 Home 页面，现在来创建一个 About 页面，

新建 src\pages\About\index.js，

```js
import React from 'react';

class About extends React.Component {
    render() {
        return <div>About Page</div>;
    }
}

export default About;
```

新建路由配置 src\router\index.js，

```js
import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Router } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

function getRouter() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <hr />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default getRouter;
```

修改 src\index.js，

```js
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router';

ReactDom.render(
    getRouter(),
    document.getElementById('app')
);
```

编译后打开 index.html，效果如下。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200918172947.png)

## <a id="webpack-dev-serve">webpack-dev-serve</a>

文档[看这里](https://webpack.docschina.org/configuration/dev-server/)

`npm i -D webpack-dev-server@3`

webpack.dev.js 增加 devServer，

```js
devServer: {
    contentBase: DIST_PATH,
    port: 8080,
    open: true, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩
    historyApiFallback: true
}
```

修改 package.json，

```json
"scripts": {
    "webpack-dev-server --config webpack/webpack.dev.js --progress --color"
}
```

- --color 控制台彩色输出
- --progress 编译显示进度条

--color、--progress 也可以写在 devServer 中。

执行 `npm start` 会自动打开浏览器。

## <a id="模块热替换(Hot Module Replacement)">模块热替换(Hot Module Replacement)</a>

> 配置热更新模块，这样修改页面浏览器就不会刷新了。

文档[看这里](https://webpack.docschina.org/guides/hot-module-replacement/)

打开 webpack.dev.js，

在 devServer 添加，

```js
devServer: {
    ...
    hot: true
}
```

在 plugins 添加，

```js
const webpack = require('webpack');

plugins: [
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候，该插件会显示模块的相对路径
    new webpack.HotModuleReplacementPlugin()
],
```

修改 src\router\index.js，

```js
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router';

// 防止页面刷新
if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    getRouter(),
    document.getElementById('app')
);
```

修改 Home 会在不刷新的情况下更新页面。

<font color="red">但是我们发现更改页面时 state 会重置</font>，新建一个有 state 的页面进行测试。

新建 src\pages\CounterState\index.js，

```js
import React from 'react';

class CounterState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <div>state</div>
                <div>{this.state.count}</div>
                <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
                <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
                <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
            </div>
        );
    }
}

export default CounterState;
```

打开 src\router\index.js，把 CounterState 页面添加进路由。

<font color="red">运行，当我们修改 CounterState 页面时，count 被重置为 0 了。</font>

因为 webpack-devserver 的热替换并不能保存 state 状态，所以需要引入 react-hot-loader，该插件对 --hot 做了额外的处理可以让状态保存下来。

**解决 state 重置的问题**

安装 `npm i react-hot-loader`

[react-hot-loader github](https://github.com/gaearon/react-hot-loader)

在 .babelrc 添加，

```json
"plugins": [
    "react-hot-loader/babel"
    ...
]
```

在 webpack.dev.js 添加，

```js
entry: {
    app: [
        'react-hot-loader/patch'
        ...
    ]
}
```

修改 src\index.js，

```js
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import getRouter from './router';

renderWithHotReload(getRouter());

if (module.hot) {
    module.hot.accept('./router', () => {
        const getNextRouter = require('./router').default;
        renderWithHotReload(getNextRouter());
    });
}

// AppContainer 防止 state 重置
function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    );
}
```

运行查看效果，现在修改页面不会重置 state 了。

控制台可能会出现该警告 <font style="background: #FFFBE5">React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work. </font>

**去除控制台"React-Hot-Loader:..."警告**

安装 `npm i -D @hot-loader/react-dom`

在 webpack.dev.js 添加，

```js
resolve: {
    alias: {
        'react-dom': '@hot-loader/react-dom' // 去除控制台"React-Hot-Loader:..."警告
    }
}
```

这样就能解决了。

参考：

- https://github.com/gaearon/react-hot-loader/issues/1227#issuecomment-482139583

**完整配置如下：**

```js
const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize } = require('webpack-merge');

const { DIST_PATH, SRC_PATH } = require('./paths');
const commonConfig = require('./webpack.common');

const devConfig = {
    // https://webpack.docschina.org/configuration/mode/
    // none，不使用 webpack 的默认配置
    mode: 'none',

    entry: {
        app: [
            path.join(SRC_PATH, 'index.js'),
            'react-hot-loader/patch'
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候，该插件会显示模块的相对路径
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        alias: {
            // 去除控制台"React-Hot-Loader:..."警告
            // https://github.com/gaearon/react-hot-loader/issues/1227#issuecomment-482139583
            'react-dom': '@hot-loader/react-dom'
        }
    },

    devServer: {
        contentBase: DIST_PATH,
        port: 8080,
        open: false, // 自动打开浏览器
        compress: true, // 启用 gzip 压缩
        hot: true,
        historyApiFallback: true
    }
};

module.exports = mergeWithCustomize({
    customizeArray(a, b, key) {
        if (key === 'entry.app') { // entry.app 不合并，全替换
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
```

## <a id="优化文件路径">优化文件路径</a>

webpack.common.js 增加，

```js
resolve: {
    alias: {
        '@': SRC_PATH
    }
}
```

然后就能简化引用的路径了，例如，

```js
import getRouter from '@/router';
```

在 vscode 编辑器中，发现 `Ctrl+鼠标左键` 不能跳到指定的文件了。

**解决方法：**

在项目根目录新建 jsconfig.json，内容如下，

```json
{
    "compilerOptions": {
      "emitDecoratorMetadata": true, // 使用元数据特性
      "experimentalDecorators": true, // 支持 ES7 的装饰器特性
      "allowSyntheticDefaultImports": true, // 允许从没有默认导出的模块中默认导入(也就是不做检查)
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "exclude": ["node_modules"]
}
```

## <a id="devtool 优化">devtool 优化</a>

文档[看这里](https://webpack.docschina.org/configuration/devtool)

如果代码写错了，浏览器报错只会报在 bundle.js 中的某行，这样很难定位错误。

![](https://gitee.com/zloooong/image_store/raw/master/img/20191228181729.png)

webpack.dev.js 增加 `devtool: 'inline-source-map'`，这样就能准确定位了。

![](https://gitee.com/zloooong/image_store/raw/master/img/20191228181831.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20191228181849.png)

在 Source 里面也能够打断点调试。

## <a id="编译图片">编译图片</a>

在 src\pages\Home\index.js 添加图片，

```js
import React from 'react';

import logo from '@/assets/logo.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>Home Page</div>
                <p><img style={{ width: '100px' }} src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img style={{ width: '150px' }} src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;
```

运行报错。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922145004.png)

**解决方法：**

文档[看这里](https://webpack.docschina.org/loaders/url-loader/)

安装 `npm i -D file-loader url-loader`

> file-loader 可以把 import/require 导入的文件解析为 url。
> url-loader 可以把文件转换为 base64。

webpack.common.js rules 添加，

```js
{
    test: /\.(png|jpe?g|gif)$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192 // 小于 8kb 的图片转换为 base64 编码
        }
    }]
}
```

效果如图，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922145941.png)

小于 8kb 的图片已转换，大于的则不转换且文件名变 hash。

## <a id="编译 CSS">编译 CSS</a>

新增样式文件 src\pages\Home\styles.css，

```css
.avatar {
    width: 100px;
}

.logo {
    width: 150px;
}
```

在 Home 页面引入样式，

```js
import React from 'react';

import logo from '@/assets/logo.jpg';
import './styles.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>Home Page</div>
                <p><img className="avatar" src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img className="logo" src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;
```

运行报错。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922151928.png)

**解决方法：**

文档[看这里](https://webpack.docschina.org/loaders/style-loader/)

安装 `npm i -D style-loader css-loader`

> style-loader 编译时将样式是打包进 js 中，会以嵌入的方式把样式插入到页面。
> css-loader 使你能够使用 @import 和 url() 的方式实现 require() 功能。

webpack.common.js rules 添加，

```js
{
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
}
```

效果如图。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922153231.png)

## <a id="CSS 模块化">CSS 模块化</a>

>从上一节来看，如果别的页面也有个相同的 .logo 样式类，那么样式就会覆盖或被覆盖了。
>CSS 模块化是什么？其实就是样式命名唯一，避免冲突。

文档[看这里](https://webpack.docschina.org/loaders/css-loader/)

webpack.common.js rules 修改样式规则项，

```js
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
    }]
}
```

修改 Home 页面，需要以 styles 对象的方式使用，

```js
import React from 'react';

import logo from '@/assets/logo.jpg';
import styles from './styles.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>Home Page</div>
                <p><img className={styles.avatar} src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img className={styles.logo} src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;
```

效果如图，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922161609.png)

样式类名是以“文件名__类名--hash”组成的。

**某个样式类不想模块化？**

`:global(.className)` 可以用来声明一个明确的全局选择器。

```css
:global(.global-class-name) {
  color: blue;
}
```

参考：

- https://webpack.docschina.org/loaders/css-loader/#scope

**写好多的 styles.xxx 很烦怎么办？**

可以用 [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) 自动加 styles 前缀（推荐）。

[babel-plugin-jsx-css-modules](https://github.com/CJY0208/babel-plugin-jsx-css-modules) 类似 babel-plugin-react-css-modules，也能实现自动加 styles 前缀。

参考：

- https://zhuanlan.zhihu.com/p/20495964?columnSlug=purerender
- https://github.com/rails/webpacker/issues/2197#issuecomment-517234086

## <a id="样式自动补全">样式自动补全</a>

我们通常写的页面需要兼容多个平台，而样式的兼容写法一般是，

```css
.box {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-box;
}
```

但是这样手写重复繁琐，可以借助插件自动加上兼容属性。

安装 `npm i -D postcss-loader postcss-preset-env`

webpack.common.js rules 添加样式规则项，

```js
{
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: ['postcss-preset-env']
        }
    }
}
```

添加兼容规则有两种方式：

1. 在 package.json 中配置

```json
"browserslist": [
    "Android 4.1",
    "iOS 7.1",
    "Chrome > 31",
    "ff > 31",
    "ie >= 8"
]
```

2. 单独一个 .browserslistrc 文件

```
Android 4.1
iOS 7.1
Chrome > 31
ff > 31
ie >= 8
```

src\pages\Home\styles.css 添加样式，

```
.title {
    display: flex;
}
```

Home 页面使用样式，

```js
<div className={styles.title}>Home Page</div>
```

效果如图。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922170336.png)

**JS 文件中编写样式不能补全？**

[文档 ](https://webpack.docschina.org/loaders/postcss-loader/#execute)

使用  `postcss-js` 可解决，但是我的配置运行报错。

也有人遇到 [同样的问题](https://github.com/postcss/postcss-js/issues/26) ，参考该 issue 改成 `module.exports` 导出没有报错，但是打印结果为 `{}`。

建议使用 [styled-components](https://github.com/styled-components/styled-components)。

参考：

- https://webpack.docschina.org/loaders/postcss-loader/#autoprefixing
- https://github.com/webpack-contrib/postcss-loader

## <a id="Less">Less</a>

> less 支持在 css 中使用函数，变量，嵌套的写法。

文档[看这里](https://webpack.docschina.org/loaders/less-loader/)

`npm i -D less less-loader`

webpack.common.js rules 添加样式规则项，

```js
{
    loader: 'less-loader'
}
```

修改

`test: /\.css$/` => `test: /\.less$/`

`styles.css` => `styles.less`

在 .title 增加 .subTitle 子类，

```css
.title {
    display: flex;
    font-size: 18px;
    .subTitle {
        color: blue;
    }
}
```

Home 页面修改，

```js
<div className={styles.title}>
    hello
    <span className={styles.subTitle}> React</span>
</div>
```

效果如图。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200922183300.png)

**支持自定义函数**

>Less 本身不具备能自定义函数的功能，但是使用 less-plugin-functions 可以实现。

安装 `npm i -D less-plugin-functions`，

webpack\webpack.common.js，添加 less-loader plugins，

```
const LessPluginFunctions = require('less-plugin-functions');

{
  loader: 'less-loader',
  options: {
    lessOptions: {
      plugins: [new LessPluginFunctions()]
    }
  }
}
```

定义函数使用

![](https://gitee.com/zloooong/image_store/raw/master/img/20210118171802.png)

## <a id="Sass">Sass</a>

> sass 支持在 css 中使用函数，变量，嵌套的写法。

> dart-sass 已经更名为 sass 了，以后只需要安装 sass 跟 loader 就行了。

文档[看这里](https://webpack.docschina.org/loaders/sass-loader/)

`npm i -D sass sass-loader`

webpack.common.js rules 添加规则项，这里复制 less 进行修改，完整如下，

```js
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
```

> tips: `loader` 的执行的顺序是右到左的，sass-loader -> postcss-loader -> css-loader -> style-loader

新建 src\pages\About\styles.scss，

```css
.title {
    display: flex;
    font-size: 18px;
    .subTitle {
        color: red;
    }
}
```

About 页面修改，

```js
import React from 'react';
import styles from './styles.scss';

class About extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.title}>
                    Hello
                    <span className={styles.subTitle}> Sass</span>
                </div>
            </div>
        );
    }
}

export default About;
```

效果如图。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200923114538.png)

## <a id="请求代理 Proxy">请求代理 Proxy</a>

> 一般用来解决跨域问题。

文档[看这里](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

打开 `webpack\webpack.dev.js`，增加 proxy

```js
devServer: {
    ...
    proxy: {
      // http://localhost:7001/api/getList => http://localhost:7001/getList
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: { '^/api': '' },
        changeOrigin: true // target 是域名的话，需要这个参数
      }
    }
}
```

比如使用 axios，axios.get('/api/getList')，则会匹配代理。

## <a id="按需加载">按需加载</a>

>为什么需要按需加载？
>
>webpack 把所有页面打包成一个 bundle.js，这样首屏加载需要更多的时间。
>
>按需加载就是每个页面打包成单独的 js，在进入该页面时才加载对应的 js。

文档[看这里](https://webpack.docschina.org/guides/code-splitting/#dynamic-imports)

创建 src\router\asyncComponent.js，该方法的作用是异步加载页面，

```js
import React from 'react';

function Loading() {
    return <div>页面加载中...</div>;
}

export default function asyncComponent(importComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            importComponent().then((cmp) => {
                this.setState({ component: cmp.default });
            })
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <Loading />;
        }
    };
}
```

打开 src\router\index.js，更改引入页面的方式，

```js
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
```

webpack.common.js output 增加，

```js
chunkFilename: '[name].js' // name 是从 /* webpackChunkName: "xxPage" */ 中取的
```

运行查看效果，点 CounterState 链接后会加载 CounterState.js。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200923160721.png)

<font style="color: red;">使用按需加载会导致热更新失效，</font>解决方法是用 hot 方法包裹组件。

```js
import { hot } from 'react-hot-loader/root';

class CounterState extends React.Component {
    ....
}

export default hot(CounterState);
```

参考：

- https://www.cnblogs.com/lyxverycool/articles/11022388.html
- https://github.com/gaearon/react-hot-loader#code-splitting

## <a id="缓存">缓存</a>

>我们都知道浏览器会缓存 js 文件，而我们打包出来的文件都没有带 hash 值，如果部署了新版本，客户端依旧使用的是旧版本。

怎么解决？打包时给文件加上 hash 值。

文档[看这里](https://webpack.docschina.org/guides/caching)

webpack.common.js output 修改，

```js
filename: '[name].[hash].js', // name 是入口名称
chunkFilename: '[name].[chunkhash].js' // name 是从 /* webpackChunkName: "xxPage" */ 中取的
```

运行后浏览器报错。

```json
GET http://localhost:8080/bundle.js net::ERR_ABORTED 404 (Not Found)
```

这是因为文件加了 hash 值，而 index.html 还是引入的 bundle.js。

解决方法且看下节。

## <a id="html-webpack-plugin">html-webpack-plugin</a>

>该插件的作用是每次编自动把文件插入到 index.html 中。

`npm i -D html-webpack-plugin`

webpack.common.js 增加 plugins，

```diff
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SRC_PATH, DIST_PATH, publicPath } = require('./paths');

...
const commonConfig = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-template',
            filename: 'index.html',
            template: path.join(publicPath, 'index.html')
        })
    ]
};
```

新增 public\index.html，

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="uft-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

`<%= htmlWebpackPlugin.options.title %>`，是从配置中取得 title 值。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200923235158.png)

## <a id="提取公共代码">提取公共代码</a>

>作用就是把一些第三方库，如 react、react-router-dom，提取到单独的一个 verdor chunk 文件。因为很少回会去改动这些依赖库。所以将它们打包成独立的文件，利用客户端缓存机制，减少向服务器获取资源。

文档[看这里](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks)

webpack.common.js 增加 splitChunks，

```js
const commonConfig = {
    ...
    optimization: {
        splitChunks: {
            cacheGroups: {
                verdor: {
                    test: /[\\/]node_modules[\\/]/, // 这样写也可以 path.join(process.cwd(), 'node_modules')
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
```

测试结果如图，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926094703.png)

app 体积变小了很多，用到的依赖库全部打包到 verdor。

`npm i axios`，安装一个 axios.js 库来测试。

在 CounterState 页面引入 axios（<font style="color: red;">不引入的话是不会打包到 vendor，因为 webpack 只打包使用到的文件</font>），

`import axios from 'axios'`

执行编译，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926101932.png)

可以看到 vendor 体积又变大了一点，说明把 axios.js 打包进去了。

#### runtimeChunk

>当我们修改`按需加载的页面`时，app.js 的 hash 值改变了。想象一个这样的场景，线上版本的某个网页有错别字，现在我们修正发版，然而只是修改了一个页面的错别字，但是 app.js 的 hash 改变了，这样用户需要重新下载 app.js。

文档[看这里](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk)

我们测试一下，修改 CounterState 页面的文字，执行编译如下,

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926102319.png)

和上图对比，可以看到 CounterState 和 app 的 hash 都改变了。CounterState 是按需加载页面，理想效果是该页面内容的修改不影响 app。

我们可以用 runtimeChunk 解决这个问题。

webpack.common.js 增加 runtimeChunk，

```js
const commonConfig = {
    ...
    optimization: {
        splitChunks: {
            ...
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }
};
```

执行编译，可以看到增加了 runtime 文件，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926104737.png)

随便修改下 CounterState 页面的文字再执行编译，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926104747.png)

可以看到只有 CounterState、runtime 的 hash 改变了。

参考：

- https://segmentfault.com/q/1010000014954264

#### HashedModuleIdsPlugin

文档[看这里](https://webpack.docschina.org/plugins/hashed-module-ids-plugin/)

下面我们测试一种情况。

新建 src\pages\Home\test.js，并在 Home 页面移入，并注释掉引入的代码，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927010947.png)

编译结果，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927011026.png)

去掉注释再编译，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927011037.png)

可以看到 hash 都改变了，这是因为 Home 引入了一个新的模块导致的。

**解决方法**

webpack.common.js plugins 增加，

```js
const commonConfig = {
    ...
    plugins: [
        ...
        new webpack.HashedModuleIdsPlugin()
    ],
};
```

按照上面步骤再测试，前后结果对比，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927012655.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927012711.png)

可以看到只有 app 和 runtime 的 hash 改变了。

<font color="red">还有一个测试发现，在按需加载页面 CounterState 导入 test.js 不会改变 app 的 hash。</font>

在 webpack 文档中，HashedModuleIdsPlugin 建议用在生产环境。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200926120107.png)

**NamedModulesPlugin**

文档[看这里](https://webpack.docschina.org/migrate/5/#update-outdated-options)

~~NamedModulesPlugin 和 HashedModuleIdsPlugin 类似，区别是在 Home 页面导入 test.js 会影响按需加载页面的 hash。~~

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927012448.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927012508.png)

<font color="green">导致按需加载页面的 hash 变化的原因是 webpack.common.js 中 mode 属性值是 'none'，改为 'development' 就可以了。</font>

NamedModulesPlugin 还可以显示更新的模块路径，所以适用于开发环境，HashedModuleIdsPlugin 适用于生产环境环境。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927014131.png)

**最后**

升级废弃的配置项，文档[看这里](https://webpack.docschina.org/migrate/5/#update-outdated-options)。

由于 webpack@4.x 配置升级，替换如下，

`NamedModulesPlugin ↦ optimization.moduleIds: 'named'`

`HashedModulesPlugin ↦ optimization.moduleIds: 'hashed'`

所以我们也跟进改动。

删除掉 `new webpack.NamedModulesPlugin()` 和 `new webpack.HashedModuleIdsPlugin()`，

webpack.common.js optimization 增加，

```js
const commonConfig = {
    ...
    optimization: [
        ...
        // named 对应旧的 new webpack.NamedModulesPlugin() // 当开启 HMR 的时候，该插件会显示模块的相对路径
        // hashed 对应旧的 new webpack.HashedModuleIdsPlugin()
        moduleIds: 'named'
    ],
};
```



参考：

- https://www.imooc.com/article/21538

## <a id="生成环境构建">生成环境构建</a>

>开发环境和生产环境的构建目标差异很大。在开发环境中，我们需要 localhost server、热加载、source map。而在生产环境中，我们的目标转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议每个环境编写彼此独立的 webpack 配置。

[文档](https://webpack.docschina.org/guides/production/) [issue1](https://github.com/webpack/webpack/issues/2537) [issue2](https://github.com/niexias/niexias.github.io/issues/7)

#### copy-webpack-plugin

>用于拷贝文件，由于 favicon.ico 文件在 public 目录，编译后拷贝到指定的目录。

文档[看这里](https://webpack.docschina.org/plugins/copy-webpack-plugin/)

`npm i -D copy-webpack-plugin`

webpack.common.js plugins 增加，

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = {
    ...
    plugins: [
        ...
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(publicPath, 'favicon.ico'),
                to: path.join(DIST_PATH, 'favicon.ico')
            }]
        })
    ],
};
```

#### webpack.DefinePlugin

> 创建 browser 环境全局常量 process.env.xx。

文档[看这里](https://webpack.docschina.org/plugins/define-plugin/)

webpack.common.js plugins 增加，

```js
const commonConfig = {
    ...
    plugins: [
        ...
        new webpack.DefinePlugin({
            // https://www.cnblogs.com/usebtf/p/9912413.html
            'process.env': {
                PUBLIC_PATH: JSON.stringify('')
            }
        })
    ],
};
```

在 Home 页面 `console.log(process.env.PUBLIC_PATH)` 试试。

参考：

- https://www.cnblogs.com/usebtf/p/9912413.html

#### cross-env

> 创建 node 环境全局常量 process.env.xx。

文档[看这里](https://github.com/kentcdodds/cross-env)

`npm i -D cross-env`

package.json 修改，

```json
"scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config webpack/webpack.dev.js --progress --color",
    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.prod.js"
}
```

webpack.common.js plugins 增加，

```js
const isDev = process.env.NODE_ENV === 'development';
```

这样就能在配置文件中根据不同环境进行配置。

#### clean-webpack-plugin

>编译生产包的出口在 dist 目录，我们编译时需要把之前的文件删除。

文档[看这里](https://www.npmjs.com/package/clean-webpack-plugin)

`npm i -D clean-webpack-plugin`

webpack.prod.js 配置，

```js
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = require('./webpack.common');

const prodConfig = {
    devtool: false, // 'source-map'

    plugins: [
        new CleanWebpackPlugin()
    ]
};

module.exports = merge(commonConfig, prodConfig);
```

执行 `npm run build` 打包。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927032113.png)

#### mini-css-extract-plugin

>在开发环境中，使用 style-loader 打包样式进 js。但在生产环境中这样会导致 js 文件过大，所以需要将 css 提取为独立的文件，通过 link 外链方式加载。

文档[看这里](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)

`npm i -D mini-css-extract-plugin`

webpack.common.js 修改，

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

{ loader: 'style-loader' } => { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader }
```

webpack.prod.js plugins 增加，

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
    ...
    plugins: [
        ...
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
    ],
};
```

由于按需加载页面 CounterState 没有用到样式，为了更完整的测试，先加上样式。

新建 src\pages\CounterState\styles.less，

```css
.title {
    display: flex;
    font-size: 18px;
    .count {
        color: red;
    }
}
```

CounterState 页面修改，

```js
import styles from './styles.less';
...
render() {
    return (
        <div>
            <div className={styles.title}>
                State
                <span className={styles.count}>{this.state.count}</span>
            </div>
            <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
            <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
            <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
        </div>
    );
}
```

执行 `npm run build` 打包，

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927181319.png)

可以看到 css 提取到单独的文件中。

#### 生产环境压缩 JS

> webpack@4.x 已内置 js 压缩， 无需安装 `uglifyjs-webpack-plugin` 插件。

[文档1](https://webpack.docschina.org/configuration/optimization/#optimizationminimize) [文档2](https://webpack.docschina.org/configuration/mode/)

当 `mode: 'production'`，webpack 会自动启用压缩，或者设置 `minimize: true` 开启。

#### 生产环境压缩 CSS

> webpack@4.x 没有内置 css 压缩，所以需要用到 optimize-css-assets-webpack-plugin 插件。

[文档1](https://github.com/NMFR/optimize-css-assets-webpack-plugin) [文档2](https://webpack.docschina.org/plugins/mini-css-extract-plugin/#minimizing-for-production)

`npm i -D terser-webpack-plugin optimize-css-assets-webpack-plugin`

需要通过 [terser-webpack-plugin](https://webpack.docschina.org/configuration/optimization/#optimizationminimizer) 插件来定制压缩。

webpack.prod.js optimization 增加，

```js
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    ...
    optimization: [
        ...
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    ],
};
```

执行 `npm run build` 打包。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927222523.png)

#### http-server

> 生产环境的包已经有了，我们需要一个 web 服务器运行查看效果。

文档[看这里](https://github.com/http-party/http-server)

安装到全局环境 `npm i -g http-server`。

切换到 dist 目录，执行 `http-server` 查看。

## <a id="打包优化">打包优化</a>

#### dll 缓存

webpack@4.x 有着比 dll 更好的打包性能，所以不推荐使用。

参考：

- [辛辛苦苦学会的 webpack dll 配置，可能已经过时了](https://juejin.im/post/6844903952140468232#heading-4)

#### 多线程打包

**happypack**

小项目提升不大，甚至会增加项目的构建速度。happypack 不一定兼容新版的 loader。

[Webpack@4.x 可能不需要使用 happypack，默认支持多线程打包了。](https://github.com/amireh/happypack#faq)

**thread-loader**

类似 happypack。

测试了一下，没有什么提升，反而多了2秒，可能大项目才能看出效果。

参考：

- [使用 happypack 提升 Webpack 项目构建速度](https://juejin.im/post/6844903780337582088)

## <a id="扩展">扩展</a>

#### <a id="打包体积可视化分析">打包体积可视化分析</a>

文档[看这里](https://github.com/webpack-contrib/webpack-bundle-analyzer)

`npm i -D webpack-bundle-analyzer`

webpack.prod.js plugins 增加，

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
    ...
    plugins: [
        ...
        new BundleAnalyzerPlugin()
    ],
};
```

执行 `npm run build` 查看效果。

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927230428.png)

#### <a id="支持装饰器">支持装饰器</a>

> 装饰器是一个函数，用来修改类的行为。这是 ES7 的一个提案，目前通过 babel 转码支持。

`npm i -D @babel/plugin-proposal-decorators`

在 .babelrc plugins 增加，

```json
{
    ...
    "plugins": [
        ...
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
}
```

在 CounterState 页面使用装饰器。

```js
...
@hot
class CounterState extends React.Component {
    ...
}
export default CounterState;
```

#### <a id="解决在 class 中定义静态属性的问题">解决在 class 中定义静态属性的问题</a>

我们在 Home 页面增加一个类属性，编译报错了？

![](https://gitee.com/zloooong/image_store/raw/master/img/20200927232938.png)

@babel/plugin-proposal-class-properties 插件可以解决这个问题。

`npm i -D @babel/plugin-proposal-class-properties`

在 .babelrc plugins 增加。

```json
{
    ...
    "plugins": [
        ...
        "@babel/plugin-proposal-class-properties"
    ]
}
```

#### <a id="Webpack 配置全局变量">Webpack 配置全局变量</a>

```
plugins: [
  ...
  new webpack.ProvidePlugin({
    $:"jquery",
    _:"loadsh"
  })
]
```

后续编写模块就不需要引入而直接使用。

#### <a id="分离 CSS 文件导致资源路径错误">分离 CSS 文件导致资源路径错误</a>

文档[看这里](https://webpack.docschina.org/plugins/mini-css-extract-plugin/#publicpath)

当打包后，资源 url 是相对于 CSS 文件的路径，也就是 static/css，所以导致资源不存在

![](https://gitee.com/zloooong/image_store/raw/master/img/20210407181511.png)

**解决：**

修改资源的路径到 dist 目录

```
...(!isDev && {
    options: {
      publicPath: '../../'
    }
  })
```

![](https://gitee.com/zloooong/image_store/raw/master/img/20210407181651.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/20210407182312.png)

#### <a id="优化编译信息在控制台的显示效果">优化编译信息在控制台的显示效果</a>

默认的显示效果看起来很杂乱，我们来优化一下。

![](https://gitee.com/zloooong/image_store/raw/master/img/20210514165832.png)

安装 `npm i -D progress-bar-webpack-plugin react-dev-utils`

新增 webpack\devServer.js，用来获取 IP；

```js
const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址

let ipAdress = '';
for (const devName in interfaces) {
  if (Object.prototype.hasOwnProperty.call(interfaces, devName)) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        ipAdress = alias.address;
      }
    }
  }
}

module.exports = {
  port: '8080',
  ipAdress
};
```

修改 webpack.dev.js；

```js
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const devServer = require('./devServer');

plugins: [
    new ProgressBarPlugin({
          /* eslint-disable no-console */
          format: ` Avtion [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
          clear: false,
          callback: () => {
            console.log(' \n 成功启动服务！！！😊😊😊');
            console.log(` \n Local:            ${chalk.green(`http://localhost:${devServer.port}/`)}`);
            console.log(` On Your Network:  ${chalk.green(`http://${devServer.ipAdress}:${devServer.port}/`)}`);
            console.log('\n\nNote that the development build is not optimized.');
            console.log(`To create a production build, use ${chalk.yellow('npm run build')}.`);
          }
          /* eslint-enable no-console */
        })
	...
],

devServer: {
	...
	port: devServer.port,
	clientLogLevel: 'silent', // 禁止浏览器控制台上输出热重载进度【这可能很繁琐】
    noInfo: true, // 控制台禁止显示诸如 Webpack 捆绑包信息之类的消息。错误和警告仍将显示。
}
```

修改 webpack.prod.js；

```js
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

plugins: [
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    })
    ...
]
```

最后把 package.json 中的  `--progress --color` 去掉。

效果如图：

![](https://gitee.com/zloooong/image_store/raw/master/img/20210514171204.png)

## 参考

- [从零搭建React全家桶框架教程](https://github.com/brickspert/blog/issues/1)
- [从0到1开始学习webpack](https://github.com/yangfan-coder/webpack-tutorial)
