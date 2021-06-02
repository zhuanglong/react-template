import React, { useState, useEffect, useMemo } from 'react';

import NavBar from '@/components/NavBar';
import toast from '@/components/Toast';
import history from '@/router/history';
import * as messageApi from '@/services/message';
import styles from './styles.scss';

function Message() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    messageApi.getMessageList().then((res) => {
      if (res.code === 0) {
        setMessageList(res.data);
      } else {
        //
      }
    });
  }, []);

  const go = (id) => {
    history.push(`/message-detail?id=${id}`);
  };

  return (
    <>
      {useMemo(() => ( // 这里的导航栏没有动态的 props，可以用 useMemo 减少不必要的渲染
        <NavBar
          showBack={false}
          rightView="清除未读"
          onRightView={() => toast.show('已清除')}
        />
      ), [])}
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
