import React from 'react';

import NavBar from '@/components/NavBar';
import BasicNotification from '@/components/BasicNotification';
// import styles from './styles.scss';

let basicNotification = null;
BasicNotification.newInstance({}, (bn) => {
  basicNotification = bn;
});
console.log(basicNotification);

function Product() {
  return (
    <>
      <NavBar />
      <div>
        Product
      </div>
    </>
  );
}

export default Product;
