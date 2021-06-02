> 基于个人搭建的脚手架 [react-template](https://github.com/zhuanglong/react-template) 开发。

[项目地址](https://github.com/zhuanglong/react-template/tree/dva)

## 使用 dva

`npm i dva`

- [dva](https://dvajs.com/) 是状态管理器。

以下会用到装饰器语法，请参考 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

新建 src\models\counter.js，

```js
export default {
  namespace: 'counter',

  state: {
    count: 0
  },

  reducers: {
    increment(state) {
      return {
        ...state,
        count: state.count + 1
      };
    },
    decrement(state) {
      return {
        ...state,
        count: state.count - 1
      };
    },
    reset(state) {
      return {
        ...state,
        count: 0
      };
    }
  }
};
```

新建 src\models\index.js，用于导出 model，

```js
const context = require.context('./', false, /\.js$/); // false 表示不遍历文件夹

const models = context
  .keys()
  .filter((model) => model !== './index.js') // 过滤 index.js
  .map((model) => context(model)); // 获取所有的 model 包含到 context 中去

export default models;
```

src\index.js，在入口处添加 model，

```js
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import dva from 'dva';

import getRouter from '@/router';
import models from '@/models';

const app = dva();

// require('@/models').default.forEach((model) => app.model(model.default));
[...models].forEach((model) => app.model(model.default));

app.router(() => getRouter());

const App = app.start();

function renderWithHotReload() {
  ReactDom.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
}

renderWithHotReload();

if (module.hot) {
  module.hot.accept('@/router', () => {
    renderWithHotReload();
  });
}
```

新建测试页面 src\pages\CounterDva\index.js，

```js
import React from 'react';
// import { hot } from 'react-hot-loader/root';
import { connect } from 'dva';

// @hot
@connect(({
  counter
}) => ({
  count: counter.count
}))
class CounterDva extends React.Component {
  state = {
    count: 0
  };

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <div>
          State 计数：
          <span>{this.state.count}</span>
        </div>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
        <br />
        <div>
          Dva 计数：
          <span>{this.props.count}</span>
        </div>
        <button type="button" onClick={() => dispatch({ type: 'counter/decrement' })}>-</button>
        <button type="button" onClick={() => dispatch({ type: 'counter/increment' })}>+</button>
        <button type="button" onClick={() => dispatch({ type: 'counter/reset' })}>reset</button>
      </div>
    );
  }
}

export default CounterDva;
```

最后，把该页面添加到路由。

![](https://gitee.com/zloooong/image_store/raw/master/img/20201020225527.png)

注意：

dva 和 react-hot-loader 一起使用会有冲突，如果 CounterDva 是按需加载页面，无论是否添加 @hot，修改页面都没有重新渲染。

==建议不使用 react-hot-loader。==
