import React from 'react';
import { SettingOutlined, RightOutlined } from '@ant-design/icons';

import NavBar from '@/components/NavBar';
import toast from '@/components/Toast2';
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

  const pushPage = (index) => {
    if (index === 0) {
      toast.show('已清除');
    } else if (index === 1) {
      toast.show('已清除2');
    } else if (index === 2) {
      toast.fail('已清除3');
    }
    // props.history.push('/profile');
  };
  // toast.show('已清除');
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
            <div key={index} className={styles.item} onClick={() => pushPage(index)}>
              <div className={styles.itemTitle}>{item.title}</div>
              <RightOutlined className={styles.itemIcon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default My;
