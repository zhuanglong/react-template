import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles.scss';

const list = [{
  name: '首页',
  path: '/'
}, {
  name: '消息',
  path: '/message'
}, {
  name: '我的',
  path: '/my'
}];

function TabBar(props) {
  console.log(props);
  const { location: { pathname } } = props;
  const [active, setActive] = useState(pathname);

  const onTab = (index) => {
    setActive(list[index].path);
    props.history.replace(list[index].path);
  };

  const isTabBar = list.findIndex((item) => item.path === pathname) >= 0;

  return (isTabBar && (
    <>
      <div className={styles.fill} />
      <div className={styles.container}>
        {list.map((item, index) => (
          <div
            key={index}
            className={classnames(styles.tabItem, item.path === active && styles.tabItemActive)}
            onClick={() => onTab(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  ));
}

export default withRouter(TabBar);
