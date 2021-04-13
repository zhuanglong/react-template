import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles.scss';

const list = [{
  name: '首页',
  path: '/'
}, {
  name: '发现',
  path: '/discover'
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

  return (
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
  );
}

export default withRouter(TabBar);
