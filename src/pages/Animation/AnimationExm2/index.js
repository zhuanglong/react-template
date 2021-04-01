import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './styles.less';

function AnimationExm2() {
  const [count, setCount] = useState(0);
  const [type, setType] = useState();

  const decrement = () => {
    setType('fadeD');
    setTimeout(() => {
      setCount(count - 1);
    });
  };

  const increment = () => {
    setType('fadeI');
    setTimeout(() => {
      setCount(count + 1);
    });
  };

  const reset = () => {
    setTimeout(() => {
      setType(type === 'fadeD' ? 'fadeI' : 'fadeD');
      setCount(0);
    });
  };

  return (
    <div>
      <div>
        Count:
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={count}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames={{
              enter: styles[`${type}-enter`],
              enterActive: styles[`${type}-enter-active`],
              exit: styles[`${type}-exit`],
              exitActive: styles[`${type}-exit-active`]
            }}
          >
            <div className={styles.count}>{count}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <button type="button" onClick={decrement}>-</button>
      <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={reset}>reset</button>
    </div>
  );
}

export default AnimationExm2;
