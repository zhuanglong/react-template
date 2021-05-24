import React, { useState, useCallback } from 'react';
import KeepAlive from 'react-activation';

import NavBar from '@/components/NavBar';
import Slide from '@/components/Slide';
import useScroll from '@/hooks/useScroll';
import styles from './styles.scss';

function Home(props) {
  const { top } = useScroll(document);
  const [imgs] = useState([{
    url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393347426,1800905021&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2216046132,2701662030&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1049504560,1303436644&fm=26&gp=0.jpg'
  }]);

  const pushPage = () => {
    props.history.push('/product');
  };

  // 渐变处理
  const thatTop = String(top).split('.')[0];
  let opacity = 0;
  let height = hotcss.px2rem(35);
  if (thatTop.length === 2) {
    if (thatTop > '40') {
      opacity = `0.${thatTop}`;
      height = hotcss.px2rem(45);
    }
  } else if (thatTop.length > 2) {
    opacity = 1;
    height = NavBar.height;
  }

  // 拿到实例
  const onSwiper = useCallback((instance) => {
    instance.on('tap', (ev) => {
      console.log(ev.realIndex);
    });
  }, []);

  return (
    <>
      <NavBar
        title="首页"
        showBack={false}
        navBarInsets={false}
        style={{
          opacity,
          height,
          pointerEvents: opacity === 0 ? 'none' : 'auto',
          transition: '0.3s'
        }}
      />
      <div className={styles.container}>
        <div style={{ marginTop: hotcss.px2rem(20) }}>
          <Slide imgs={imgs} initialSlide={2} onSwiper={onSwiper} />
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
            <div key={index} className={styles.item} onClick={pushPage}>
              <div className={styles.itemIcon} />
              <div className={styles.itemTitle}>Y{index}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default (props) => <KeepAlive saveScrollPosition="screen"><Home {...props} /></KeepAlive>;
