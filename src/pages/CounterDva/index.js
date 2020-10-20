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
