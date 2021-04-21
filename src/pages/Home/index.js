import React from 'react';

import NavBar from '@/components/NavBar';
import Slide from '@/components/Slide';
import styles from './styles.scss';

function Home(props) {
  const imgs = [{
    url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393347426,1800905021&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2216046132,2701662030&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1049504560,1303436644&fm=26&gp=0.jpg'
  }];

  const pushPage = () => {
    props.history.push('/product');
  };

  const pushPage2 = () => {
    props.history.push('/profile');
  };

  return (
    <>
      <NavBar title="首页" showBack={false} />
      <div className={styles.container}>
        <div style={{ marginTop: hotcss.px2rem(20) }}>
          <Slide imgs={imgs} />
        </div>
        <div className={styles.funcBox}>
          {Array(3).fill(null).map((item, index) => (
            <div key={index} className={styles.item} onClick={pushPage}>
              <div className={styles.itemTitle}>X{index}</div>
              <div className={styles.itemIcon} />
            </div>
          ))}
        </div>
        <div className={styles.funcBox}>
          {Array(6).fill(null).map((item, index) => (
            <div key={index} className={styles.item} onClick={pushPage2}>
              <div className={styles.itemIcon} />
              <div className={styles.itemTitle}>Y{index}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
