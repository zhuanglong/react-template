import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'animate.css';

import styles from './styles.less';

const uuid = () => String(Math.random()).slice(2);

function AnimationExm4() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'Buy eggs' },
    { id: uuid(), text: 'Pay bills' },
    { id: uuid(), text: 'Invite friends over' },
    { id: uuid(), text: 'Fix the TV' }
  ]);

  const onAdd = () => {
    // eslint-disable-next-line no-alert
    const text = prompt('Enter some text');
    if (text) {
      setItems((oldItems) => [
        ...oldItems,
        { id: uuid(), text }
      ]);
    }
  };

  const onDel = (index) => {
    setItems((oldItems) => oldItems.filter((item, idx) => idx !== index));
  };

  return (
    <div>
      <TransitionGroup>
        {items.map((item, index) => (
          <CSSTransition
            key={item.id}
            timeout={500}
            className="animate__animated"
            classNames={{
              enter: styles['item-enter'],
              enterActive: 'animate__lightSpeedInLeft',
              enterDone: 'animate__jello',
              exit: styles['item-exit'],
              exitActive: 'animate__jello',
              exitDone: 'animate__slideInLeft'
            }}
          >
            <div style={{ width: '200px' }}>
              <button type="button" onClick={() => onDel(index)}>x</button> {item.text}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <br />
      <button type="button" onClick={onAdd}>Add Item</button>
    </div>
  );
}

export default AnimationExm4;
