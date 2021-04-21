import React, { useState } from 'react';

import NavBar from '@/components/NavBar';
import styles from './styles.scss';

function Message(props) {
  const [messageList] = useState([
    {
      id: '0x111',
      title: '【红包福利】摇一摇分好礼',
      content: '最高xx元现金洪波要出来，活动期间红包可累积'
    },
    {
      id: '0x112',
      title: '家务红包最低xx元起，立即领取>>>',
      content: '洗衣洗鞋、日常保洁、家电清洗......统统折上折'
    },
    {
      id: '0x113',
      title: '【教育充电节】直播钜惠',
      content: 'xx元抢报班优惠，限时底价不要错过'
    }
  ]);

  const go = (id) => {
    props.history.push(`/message-detail?id=${id}`);
  };

  return (
    <>
      <NavBar title="首页" showBack={false} />
      <div className={styles.container}>
        {messageList.map((item, index) => (
          <div key={index} className={styles.item} onClick={() => go(item.id)}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.content}>{item.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Message;
