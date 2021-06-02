import React, { useCallback, useMemo } from 'react';

import NavBar from '@/components/NavBar';
import Carousel from '@/components/Carousel';
import useScroll from '@/hooks/useScroll';
import styles from './styles.scss';

function Home(props) {
  const { top } = useScroll(document);

  // 缓存属性，防止 useScroll 导致重新渲染
  const imgs = useMemo(() => [{
    url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393347426,1800905021&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2216046132,2701662030&fm=26&gp=0.jpg'
  }, {
    url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1049504560,1303436644&fm=26&gp=0.jpg'
  }], []);

  const pushPage = () => {
    props.history.push('/product');
  };

  // 渐变处理
  const opacity = top / 45 - 1;
  // eslint-disable-next-line no-nested-ternary
  const computerOpacity = opacity <= 0 ? 0 : (opacity > 1 ? 1 : opacity);

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
          opacity: computerOpacity,
          pointerEvents: computerOpacity === 0 ? 'none' : 'auto',
          transition: '0.3s'
        }}
      />
      <div className={styles.container}>
        <div style={{ marginTop: hotcss.px2rem(20) }}>
          <Carousel imgs={imgs} initialSlide={2} onSwiper={onSwiper} />
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

export default Home;
