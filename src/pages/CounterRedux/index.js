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
