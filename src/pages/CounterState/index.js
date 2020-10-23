import React from 'react';
import { hot } from 'react-hot-loader/root';

import CounterHook from '@/pages/CounterHook';
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
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
        <br />
        <CounterHook />
      </div>
    );
  }
}

export default CounterState;
