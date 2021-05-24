import React from 'react';
import KeepAlive from 'react-activation';

import styles from './styles.scss';

class About extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.title}>
          Hello
          <span className={styles.subTitle}> Sass</span>
        </div>
        <p style={{ margin: '300px 0' }}>哈哈哈哈哈哈哈哈哈哈哈哈</p>
        <p style={{ margin: '300px 0' }}>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
        <p>哦哦哦哦哦哦哦哦哦哦哦哦</p>
      </div>
    );
  }
}

export default (props) => <KeepAlive saveScrollPosition="screen"><About {...props} /></KeepAlive>;
