import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TStyle from '@/common/TStyle';

const CounterHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count change');
  }, [count]);

  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      console.log('componentDidUpdate');
    }
  });

  useEffect(() => {
    console.log('componentDidMount');
    return () => {
      console.log('componentWillUnmount');
    };
  }, []);

  return (
    <Root>
      <div className="bgColor title">
        Hook 计数：
        <span className="count">{count}</span>
      </div>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
      <button type="button" onClick={() => setCount(0)}>reset</button>
    </Root>
  );
};

const Root = styled(TStyle)`
  .title {
    display: flex;

    .count {
      color: red;
    }
  }
`;

export default CounterHook;
