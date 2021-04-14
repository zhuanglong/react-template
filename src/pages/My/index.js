import React from 'react';
import { SettingOutlined, RightOutlined } from '@ant-design/icons';
import { hot } from 'react-hot-loader/root';

import styles from './styles.scss';

function My() {
  const funcList = [{
    title: '手机号'
  }, {
    title: '历史记录'
  }, {
    title: '关于'
  }];

  return (
    <div className={styles.container}>
      <div className={styles.avatarBox}>
        <SettingOutlined className={styles.setting} />
        <img className={styles.avatar} src={require('@/assets/20210407170253.jpg').default} alt="" />
        <div className={styles.name}>代码不止</div>
      </div>
      <div className={styles.funcBox}>
        {funcList.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemTitle}>{item.title}</div>
            <RightOutlined className={styles.itemIcon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default hot(My);
