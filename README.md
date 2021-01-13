> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/React.createContext)

Context 通过组件树提供了一个传递数据的方法，从而避免在每一层手动传递 props 属性。主题、国际化等有状态共享的都可以用 Context 实现。

#### 下面我们来实现主题切换功能

新建一个主题管理组件 src\components\Theme.js，

```js
import React from 'react';

export const themes = {
  light: {
    mode: 'light',
    background: '#eee'
  },
  dark: {
    mode: 'dark',
    background: '#222'
  }
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => null
});

export const ThemeToggleButton = () => (
  <ThemeContext.Consumer>
    {({ theme, toggleTheme }) => (
      <button type="button" onClick={toggleTheme}>
        {theme.mode === 'light' ? '暗黑' : '高亮'}主题
      </button>
    )}
  </ThemeContext.Consumer>
);
```

#### Consumer

Consumer 是订阅 context 变化的 React 组件。

通过 React.createContext 创建一个 context，并设置默认值。在 ThemeToggleButton 组件中用 Consumer 获取到 props，当 context 改变时，Consumer 就会重新渲染。

修改 src\router\index.js，

```js
import React from 'react';
import {
  HashRouter as Router, Switch, Route, Link
} from 'react-router-dom';

import { ThemeContext, ThemeToggleButton, themes } from '@/components/Theme';

import Home from '@/pages/Home';
import About from '@/pages/About';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      // eslint-disable-next-line react/no-unused-state
      toggleTheme: this.toggleTheme
    };
  }

  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.light ? themes.dark : themes.light
    }));
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Router>
          <div>
            <ThemeToggleButton />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
```

#### Provider

接收一个 value 属性传递给 Provider 的后代 Consumer。

在 App 组件中，把组件的 state 传递给 context，这样就能在其他组件内中通过 Consumer 订阅 context。

修改 src\index.js，

```
import App from '@/router'; 

在入口处把 getRouter() 换成 App。
```

修改 src\pages\Home\index.js，添加主题背景色，

```js
import React from 'react';

import { ThemeContext } from '@/components/Theme';
import logo from '@/assets/logo.jpg';
import styles from './styles.less';

class Home extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div style={{ background: theme.background }}>
            <div className={styles.title}>
              Hello
              <span className={styles.subTitle}> React</span>
            </div>
            <p><img className={styles.avatar} src={require('@/assets/avatar.jpg').default} alt="" /></p>
            <p><img className={styles.logo} src={logo} alt="" /></p>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Home;
```

效果如下：

![](https://gitee.com/zloooong/image_store/raw/master/img/20201029181711.png)

#### 更方便的获取 context（高阶组件）

主题 context，不单单在一个组件里使用，每次使用都要用 Consumer 才能获取到，这样比较繁琐，我们可以封装一个高阶函数解决。

修改 src\components\Theme.js，

增加 withTheme 高阶函数，

```js
export const withTheme = (Component) => (
  (props) => (
    <ThemeContext.Consumer>
      {(contextProps) => <Component {...props} {...contextProps} />}
    </ThemeContext.Consumer>
  )
);

// 用 hook useContext 也能实现
// export const withTheme = (Component) => (props) => {
//   const contextProps = useContext(ThemeContext);
//   return <Component {...props} {...contextProps} />;
// };
```

用 withTheme 包裹 ThemeToggleButton，

```js
export const ThemeToggleButton = withTheme(({ theme, toggleTheme }) => (
  <button type="button" onClick={toggleTheme}>
    {theme.mode === 'light' ? '暗黑' : '高亮'}主题
  </button>
));
```

修改 src\pages\About\index.js，

```js
import React from 'react';
import { withTheme } from '@/components/Theme';
import styles from './styles.scss';

class About extends React.Component {
  render() {
    return (
      <div style={{ background: this.props.theme.background }}>
        <div className={styles.title}>
          Hello
          <span className={styles.subTitle}> Sass</span>
        </div>
      </div>
    );
  }
}

export default withTheme(About);
```
当然也可以用装饰器 `@withTheme`。

## 参考

- [React.createContext官网的解读](https://blog.csdn.net/qq_30638831/article/details/89045908)

- https://react.docschina.org/docs/context.html#caveats