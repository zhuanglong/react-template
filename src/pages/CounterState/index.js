import React from 'react';
import { hot } from 'react-hot-loader/root';

import { withTheme } from '@/components/Theme';
import styles from './styles.less';

@hot
@withTheme
class CounterState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div style={{ background: this.props.theme.background }}>
        <div className={styles.title}>
          State 计数：
          <span className={styles.count}>{this.state.count}</span>
        </div>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
      </div>
    );
  }
}

export default CounterState;
