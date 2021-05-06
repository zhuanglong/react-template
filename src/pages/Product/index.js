import React from 'react';

import NavBar from '@/components/NavBar';
import BasicNotification from '@/components/BasicNotification';
// import styles from './styles.scss';

let basicNotification = null;
BasicNotification.newInstance({}, (bn) => {
  basicNotification = bn;
});

function Product() {
  const onNotice = () => {
    basicNotification.notice({
      content: 'haha...',
      duration: 2000,
      onClose() {
        console.log('closed callback');
      }
    });
  };

  const onNotice2 = () => {
    basicNotification.notice({ content: 'xixixi...' });
  };

  return (
    <>
      <NavBar />
      <span onClick={onNotice}>
        add
      </span> |
      <span onClick={onNotice2}>
        add2
      </span>
    </>
  );
}

export default Product;
