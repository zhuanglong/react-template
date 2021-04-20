import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

import TabBar from '@/components/TabBar';
import styles from './styles.scss';

function MainLayout(props) {
  // eslint-disable-next-line no-console
  console.log(props);

  const tabBarlist = [{
    title: '首页',
    path: '/index/home',
    icon: <HomeOutlined />
  }, {
    title: '消息',
    path: '/index/message',
    icon: <MessageOutlined />
  }, {
    title: '我的',
    path: '/index/my',
    icon: <UserOutlined />
  }];

  const { location: { pathname } } = props;

  const onTab = (path) => {
    props.history.replace(path);
  };

  return (
    <>
      {props.children}
      <div className={styles.fill} />
      <div className={styles.tabBarWrap}>
        <TabBar className={styles.fill}>
          {tabBarlist.map((item, index) => (
            <TabBar.Item
              key={index}
              title={item.title}
              icon={item.icon}
              selected={item.path === pathname}
              onPress={() => onTab(item.path)}
            />
          ))}
        </TabBar>
      </div>
    </>
  );
}

export default withRouter(MainLayout);
