import React from 'react';
import { hot } from 'react-hot-loader/root';
import { inject, Observer } from 'mobx-react';

@hot
@inject('counterStore')
class CounterMobx extends React.Component {
  state = {
    count: 0
  };

  render() {
    const { counterStore } = this.props;
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
          Mobx 计数：
          <Observer>{() => <span>{counterStore.count}</span>}</Observer>
        </div>
        <button type="button" onClick={() => counterStore.decrement()}>-</button>
        <button type="button" onClick={() => counterStore.increment()}>+</button>
        <button type="button" onClick={() => counterStore.reset()}>reset</button>
      </div>
    );
  }
}

export default CounterMobx;
