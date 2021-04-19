import React from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import styles from './styles.scss';

const list = [{
  name: '首页',
  path: '/index/home'
}, {
  name: '消息',
  path: '/index/message'
}, {
  name: '我的',
  path: '/index/my'
}];

function BasicLayout(props) {
  console.log(props);
  const { location: { pathname } } = props;

  const onTab = (index) => {
    props.history.replace(list[index].path);
  };

  // const isTabBar = list.findIndex((item) => item.path === pathname) >= 0;

  return (
    <>
      {props.children}
      <div className={styles.fill} />
      <div className={styles.container}>
        {list.map((item, index) => (
          <div
            key={index}
            className={classnames(styles.tabItem, item.path === pathname && styles.tabItemActive)}
            onClick={() => onTab(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default withRouter(BasicLayout);
