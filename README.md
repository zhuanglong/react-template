> 基于个人搭建的脚手架 [react-template](https://github.com/zhuanglong/react-template) 开发。

[项目地址](https://github.com/zhuanglong/react-template/tree/redux)

## redux

`npm i redux react-redux redux-thunk`

- [redux](https://www.redux.org.cn/) 是状态管理器。
- [react-redux](https://github.com/reduxjs/react-redux) 是将 redux 与 react 结合起来的一个组件包。
- [redux-thunk](https://github.com/reduxjs/redux-thunk) 中间件，用于处理异步 action，同类型的有 redux-saga。

以下会用到装饰器语法，请参考 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

新建 src\redux\actions\counter.js，

```js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

export function reset() {
  return { type: RESET };
}
```

新建 src\redux\reducers\counter.js，

```js
import { INCREMENT, DECREMENT, RESET } from '../actions/counter';

const initState = {
  count: 0
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    case DECREMENT:
      return {
        count: state.count - 1
      };
    case RESET:
      return {
        count: 0
      };
    default:
      return state;
  }
}
```

新建一个测试文件 src\redux\test\testCounter.js，

```js
import { createStore, combineReducers } from 'redux';

import counter from '../reducers/counter';
import { increment, decrement, reset } from '../actions/counter';

const store = createStore(combineReducers({ counter }));

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

unsubscribe();
```

编译文件，

```
node_modules/.bin/webpack src\redux\test\testCounter.js
```

运行，

```
node dist/main.js
```

控制台打印如下，

```
{ counter: { count: 0 } }
{ counter: { count: 1 } }
{ counter: { count: 0 } }
{ counter: { count: 0 } }
```

从这个例子中可以看出，redux 跟 react 其实没有任何关系，可独立运行。

redux 的工作流是通过 dispatch 发送指定的 type，传递到 reducer 纯函数对状态进行更新，然后视图对 state 的更改做出响应。

## redux + react-redux 搭配使用

新建 src\redux\reducers\index.js，集中导出 reducer，

```js
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({ counter });
```

> 因为一个项目可能有很多的 reducer，所以集中到一个文件导出。

新建 src\redux\store.js，导出 store，

```js
import { createStore } from 'redux';
import combineReducers from './reducers';

const store = createStore(combineReducers);

export default store;
```

修改 src\index.js，把 store 引入，

```js
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import getRouter from '@/router';
import store from '@/redux/store';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
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

新建测试页面 src\pages\CounterRedux\index.js，

```js
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '@/redux/actions/counter';

@hot
@connect(
  (state) => ({
    counter: state.counter
  }),
  (dispatch) => ({
    dispatch
  })
)
class CounterRedux extends React.Component {
  state = {
    count: 0
  };

  render() {
    const { counter, dispatch } = this.props;
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
          Redux 计数：
          <span>{counter.count}</span>
        </div>
        <button type="button" onClick={() => dispatch(decrement())}>-</button>
        <button type="button" onClick={() => dispatch(increment())}>+</button>
        <button type="button" onClick={() => dispatch(reset())}>reset</button>
      </div>
    );
  }
}

export default CounterRedux;
```

最后，把该页面添加到路由。

![](https://gitee.com/zloooong/image_store/raw/master/img/20201020235911.png)

==redux 和 react-hot-loader 搭配使用没有冲突，不像 mobx 或 dva 会导致修改页面不能渲染。==

## redux-thunk

> redux-thunk 主要的功能就是可以让我们 dispatch 一个函数，而不只是普通的 Object。

新建 action src\redux\actions\userInfo.js，

```js
import store from '@/redux/store';

export const GET_USER_INFO_REQUEST = 'userInfo/GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'userInfo/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'userInfo/GET_USER_INFO_FAIL';

function getUserInfoRequest() {
  return { type: GET_USER_INFO_REQUEST };
}

function getUserInfoSuccess(payload) {
  return { type: GET_USER_INFO_SUCCESS, payload };
}

// function getUserInfoFail(payload) {
//   return { type: GET_USER_INFO_FAIL, payload };
// }

export function getUserInfo() {
  return (dispatch) => {
    store.dispatch(getUserInfoRequest()); // store.dispatch 和传递的参数 dispatch 作用一样
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          name: 'zhuanglong',
          age: 26
        };
        // dispatchh(getUserInfoFail({ errorMsg: '获取数据失败' }));
        dispatch(getUserInfoSuccess({ info: data }));
        resolve();
      }, 1500);
    });
  };
}
```

新建 reducer src\redux\reducers\userInfo.js，

```js
import { GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../actions/userInfo';

const initState = {
  isLoading: false,
  errMsg: '',
  info: {}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMsg: '',
        info: {}
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: '',
        info: action.payload.info
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload.errorMsg,
        info: {}
      };
    default:
      return state;
  }
}
```

在 src\redux\reducers\index.js 添加 reducer，

```js
import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';

export default combineReducers({ counter, userInfo });
```

在 src\redux\store.js 使用中间件，

```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers';

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default store;
```

新建 My 页面 src\pages\My\index.js，

```js
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { getUserInfo } from '@/redux/actions/userInfo';

class My extends React.Component {
  render() {
    const { userInfo, dispatch } = this.props;
    return (
      <div>
        <div>
          {userInfo.isLoading
            ? '请稍等...'
            : userInfo.errMsg || null}
        </div>
        <div>
          name：{userInfo.info.name}
        </div>
        <div>
          age：{userInfo.info.age}
        </div>
        <button type="button" onClick={() => dispatch(getUserInfo())}>获取</button>
      </div>
    );
  }
}

export default hot(connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(My));
```

在路由中引入 My 页面，然后运行查看效果。

## 扩展

#### 修改 redux 导致页面刷新

打开 src\redux\reducers\counter.js，count 改为 1 发现页面刷新了。

解决方法，在 src\redux\store.js 增加。

```js
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextCombineReducers = require('./reducers').default;
    store.replaceReducer(nextCombineReducers);
  });
}
```


## 参考

- https://zhuanlan.zhihu.com/p/85403048
- https://www.jianshu.com/p/2a5d79695c8b
