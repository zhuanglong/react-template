import React from 'react';
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Person as PersonIcon
} from '@material-ui/icons';

import TabBar from '@/components/TabBar';

function MainLayout(props) {
  // eslint-disable-next-line no-console
  // console.log(props);

  const tabBarlist = [{
    title: '首页',
    path: '/index/home',
    icon: <HomeIcon />,
    badge: 'new'
  }, {
    title: '消息',
    path: '/index/message',
    icon: <MessageIcon />,
    badge: 2
  }, {
    title: '我的',
    path: '/index/my',
    icon: <PersonIcon />,
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
            actived={item.path === pathname}
            onClick={() => onTab(item.path)}
          />
        ))}
      </TabBar>
    </>
  );
}

export default MainLayout;
