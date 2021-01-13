> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/hook)

Hook 是 React 16.8 版本之后添加的新属性。Hook 就是 React 提供的内置函数，这些函数可以让 Function Component 和 Class Component 一样拥有组件状态以及处理副作用。

## useState

> 用于保存函数组件的状态。

```js
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

const CounterHook = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>
        Hook 计数：
        <span>{count}</span>
      </div>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
      <button type="button" onClick={() => setCount(0)}>reset</button>
    </div>
  );
};

export default hot(CounterHook);
```

useState 的第一个参数是状态的初始值，然后返回的是一个数组。count 是状态(相当于 class 组件的 state)，setCount 用于更新状态(相当于 class 组件的 setState)。count 和 setCount 是变量名，可随意命名。


## useEffect

> 处理副作用，例如异步请求。

```js
import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';

const CounterHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count change');
  }, [count]);

  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      console.log('componentDidUpdate');
    }
  });

  useEffect(() => {
    console.log('componentDidMount');
    return () => {
      console.log('componentWillUnmount');
    };
  }, []);

  return (
    <div>
      <div>
        Hook 计数：
        <span>{count}</span>
      </div>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
      <button type="button" onClick={() => setCount(0)}>reset</button>
    </div>
  );
};

export default hot(CounterHook);
```

在这个例子中，用 useEffect 模拟了 class 组件的生命周期，这样就能处理副作用了。

useEffect 的第一个参数接收一个函数，用来处理副作用。第二个参数称之为 dependencies，是一个数组，数组中的值发生变化就会触发 useEffect 第一个参数中的函数。

返回值(如果有)则在组件销毁前调用。

useRef 可用来判断组件的挂载和组件的更新状态。


## 参考

- [React Hooks 用法大全](https://www.cnblogs.com/owenma/p/12035619.html)

- [React With Reudx Hooks详解](https://juejin.im/post/6888529255244759047)

- [超详细React Hook实践指南](https://juejin.im/post/6850418117534253069)