import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './styles.less';

@hot
class CounterState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          测试 State 缓存：
          <span className={styles.count}>{this.state.count}</span>
        </div>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
        <button type="button" onClick={this.goBack}>back</button>
      </div>
    );
  }
}

export default CounterState;
