import React from 'react';

import NavBar from '@/components/NavBar';
import Toast from '@/components/Toast';
// import styles from './styles.scss';

function Product() {
  const onNotice = () => {
    Toast.show({
      icon: <div>da1</div>,
      content: 'success',
      duration: 1,
      mask: false,
      onClose() {
        console.log('closed callback');
      }
    });
  };

  const onNotice2 = () => {
    Toast.fail({
      content: 'fail',
      // duration: null,
      mask: false
    });
  };

  const onNotice3 = () => {
    Toast.loading();
  };

  const onNotice4 = () => {
    Toast.hide();
  };

  return (
    <>
      <NavBar />
      <span onClick={onNotice}>
        add
      </span> |
      <span onClick={onNotice2}>
        add2 |
      </span>
      <span onClick={onNotice3}>
        add3 |
      </span>
      <span onClick={onNotice4}>
        close
      </span>
    </>
  );
}

export default Product;
