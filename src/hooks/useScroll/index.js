import { useState, useEffect } from 'react';

function isElement(obj) {
  if (obj !== null && typeof obj === 'object') {
    if (obj instanceof HTMLElement
      || ([1, 9].includes(obj.nodeType) && typeof obj.nodeName === 'string')
    ) {
      return true;
    }
  }
  return false;
}

function useScroll(target) {
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });

  useEffect(() => {
    try {
      if (!isElement(target.current || target)) {
        throw new Error('The "target" parameter must be Element');
      }
    } catch (error) {
      console.warn(error);
      return;
    }

    const el = target.current || target;

    function update(currentTarget) {
      let newPosition;
      if (currentTarget === document) {
        if (!currentTarget.scrollingElement) return;
        newPosition = {
          top: currentTarget.scrollingElement.scrollTop,
          let: currentTarget.scrollingElement.scrollLeft
        };
      } else {
        newPosition = {
          top: currentTarget.scrollTop,
          let: currentTarget.scrollLeft
        };
      }
      setPosition(newPosition);
    }

    function listener(event) {
      if (event.target) {
        update(event.target);
      }
    }

    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    };
  }, [target]);

  return position;
}

export default useScroll;
