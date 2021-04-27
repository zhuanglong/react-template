import React from 'react';
import { SettingOutlined, RightOutlined } from '@ant-design/icons';
import { hot } from 'react-hot-loader/root';

import NavBar from '@/components/NavBar';
import styles from './styles.scss';

function My(props) {
  const avatar = 'https://img0.baidu.com/it/u=3376612412,3331842818&fm=26&fmt=auto&gp=0.jpg';
  const funcList = [{
    title: '手机号'
  }, {
    title: '历史记录'
  }, {
    title: '关于'
  }];

  const pushPage = () => {
    props.history.push('/profile');
  };

  return (
    <>
      <NavBar showBack={false} />
      <div className={styles.container}>
        <div className={styles.avatarBox}>
          <SettingOutlined className={styles.setting} />
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
          {/* <div className={styles.avatar} style={{ backgroundImage: `url(${require('@/assets/20210407170253.jpg').default})` }} /> */}
          <div className={styles.name}>Long</div>
        </div>
        <div className={styles.funcBox}>
          {funcList.map((item, index) => (
            <div key={index} className={styles.item} onClick={pushPage}>
              <div className={styles.itemTitle}>{item.title}</div>
              <RightOutlined className={styles.itemIcon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default hot(My);
