/* eslint-disable react/prop-types */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { inject, observer } from 'mobx-react';

@hot
@inject('counterStore')
@observer
class CounterMobx extends React.Component {
  render() {
    const { counterStore } = this.props;
    return (
      <div>
        <div>
          Count
          <span>{counterStore.count}</span>
        </div>
        <button type="button" onClick={() => counterStore.decrement()}>-</button>
        <button type="button" onClick={() => counterStore.increment()}>+</button>
        <button type="button" onClick={() => counterStore.reset()}>reset</button>
      </div>
    );
  }
}

export default CounterMobx;
