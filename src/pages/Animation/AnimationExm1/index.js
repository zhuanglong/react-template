import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.less';

function AnimationExm1() {
  const [inProp, setInProp] = useState(true);
  return (
    <div>
      <CSSTransition
        in={inProp}
        timeout={200}
        // unmountOnExit
        classNames={{
          enter: styles['fade-enter'],
          enterActive: styles['fade-enter-active'],
          enterDone: styles['fade-enter-done'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active'],
          exitDone: styles['fade-exit-done']
        }}
      >
        <div>Fade</div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </div>
  );
}

export default AnimationExm1;
