import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './styles.less';

const uuid = () => String(Math.random()).slice(2);

function AnimationExm3() {
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
            classNames={{
              enter: styles['item-enter'],
              enterActive: styles['item-enter-active'],
              exit: styles['item-exit'],
              exitActive: styles['item-exit-active']
            }}
          >
            <div>
              <button type="button" onClick={() => onDel(index)}>x</button> {item.text}
            </div>
          </CSSTransition>
        ))}
        <br />
        <button type="button" onClick={onAdd}>Add Item</button>
      </TransitionGroup>
    </div>
  );
}

export default AnimationExm3;
