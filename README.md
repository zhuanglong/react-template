> 基于个人搭建的脚手架 [react-template](https://github.com/zhuanglong/react-template) 开发。

[项目地址](https://github.com/zhuanglong/react-template/tree/mobx)

## 使用 mobx

`npm i mobx mobx-react`

- [mobx](https://github.com/mobxjs/mobx) 是状态管理器。
- [mobx-react](https://github.com/mobxjs/mobx-react) 是将 mobx 与 react 结合起来的一个组件包。

以下会用到装饰器语法，请参考 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

新建 src\stores\counterStore.js，

```js
import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }

  get isOdd() {
    return this.count % 2 === 0;
  }
}

export default new CounterStore();
```

提示： mobx@6 删除了装饰器，新增 makeObservable 、 makeAutoObservable 来代替原来的装饰器。[详细](https://michel.codes/blogs/mobx6/)

新建 src\stores\index.js，用于导出 store，

```js
import counterStore from './counterStore';

const stores = {
  counterStore
};

export default stores;
```

src\index.js，在入口处添加 store，

```js
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

import getRouter from '@/router';
import stores from '@/stores';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
        <Provider {...stores}>
            {RootElement}
        </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());

if (module.hot) {
  module.hot.accept('@/router', () => {
    const getNextRouter = require('@/router').default;
    renderWithHotReload(getNextRouter());
  });
}
```

新建测试页面 src\pages\CounterMobx\index.js，

```js
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { inject, Observer } from 'mobx-react';

@hot
@inject('counterStore')
class CounterMobx extends React.Component {
  state = {
    count: 0
  };

  render() {
    const { counterStore } = this.props;
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
          Mobx 计数：
          <Observer>{() => <span>{counterStore.count}</span>}</Observer>
        </div>
        <button type="button" onClick={() => counterStore.decrement()}>-</button>
        <button type="button" onClick={() => counterStore.increment()}>+</button>
        <button type="button" onClick={() => counterStore.reset()}>reset</button>
      </div>
    );
  }
}

export default CounterMobx;
```

最后，把该页面添加到路由。

![](https://gitee.com/zloooong/image_store/raw/master/img/20201017002801.png)

<font color="red">这里为什么不用 @observer 而用 <Observer>？</font>

这是因为 react-hot-reload 和 mobx 搭配使用会出现修改了页面但没有渲染的问题，所以只好用 <Observer>。[详细](https://cn.mobx.js.org/best/decorators.html#%E5%85%8D%E8%B4%A3%E5%A3%B0%E6%98%8E-%E8%A3%85%E9%A5%B0%E5%99%A8%E8%AF%AD%E6%B3%95%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)

但还是存在一个小问题，当一次添加或删除页面上的多个元素时，组件的 state 状态会重置。

==建议不使用 react-hot-loader。==

## 参考

- https://github.com/tibotiber/mst-hmr-bug/blob/master/src/index.js
- https://github.com/mobxjs/mobx-react/issues/500
