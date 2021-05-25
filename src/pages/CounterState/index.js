import React from 'react';
import styled from 'styled-components';

import TStyle from '@/common/TStyle';
// import styles from './styles.less';

class CounterState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <Root>
        <div className="bgColor title">
          State 计数：
          <span className="count">{this.state.count}</span>
        </div>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
        <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
        <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
      </Root>
    );
  }
}

const Root = styled(TStyle)`
  .title {
    display: flex;

    .count {
      color: red;
    }
  }
`;

export default CounterState;
