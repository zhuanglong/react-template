import React, { useState, useEffect, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './styles.less';

function AnimationExm2() {
  const [count, setCount] = useState(0);
  const [type, setType] = useState();
  const typeRef = useRef();

  typeRef.current = type;

  useEffect(() => {
    const latestType = typeRef.current;
    console.log(type, latestType);
  }, [type]);

  const decrement = () => {
    if (!type || type === 'fadeI') {
      setType('fadeD');
    } else {
      setCount(count - 1);
    }
  };

  const increment = () => {
    if (!type || type === 'fadeD') {
      setType('fadeI');
    } else {
      setCount(count + 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <div>
        计数：
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
