import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

import TabBar from '@/components/TabBar';

function MainLayout(props) {
  // eslint-disable-next-line no-console
  console.log(props);

  const tabBarlist = [{
    title: '首页',
    path: '/index/home',
    icon: <HomeOutlined />,
    badge: 'new'
  }, {
    title: '消息',
    path: '/index/message',
    icon: <MessageOutlined />,
    badge: 2
  }, {
    title: '我的',
    path: '/index/my',
    icon: <UserOutlined />,
    dot: true
  }];

  const { location: { pathname } } = props;

  const onTab = (path) => {
    props.history.replace(path);
  };

  return (
    <>
      {props.children}
      <TabBar>
        {tabBarlist.map((item, index) => (
          <TabBar.Item
            key={index}
            title={item.title}
            icon={item.icon}
            badge={item.badge}
            dot={item.dot}
            selected={item.path === pathname}
            onPress={() => onTab(item.path)}
          />
        ))}
      </TabBar>
    </>
  );
}

export default withRouter(MainLayout);
