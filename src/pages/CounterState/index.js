import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'antd';

import styles from './styles.less';

@hot
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
        <div className={styles.title}>
          State 计数：
          <span className={styles.count}>{this.state.count}</span>
        </div>
        <p><Button type="primary">Antd Design Button</Button></p>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
      </div>
    );
  }
}

export default CounterState;
