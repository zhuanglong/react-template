import React from 'react';
import KeepAlive from 'react-activation';

import logo from '@/assets/logo.jpg';
import styles from './styles.less';

// import testModule from '@/common/testModule';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.title}>
          Hello
          <span className={styles.subTitle}> React</span>
        </div>
        <p><img className={styles.avatar} src={require('@/assets/avatar.jpg').default} alt="" /></p>
        <p style={{ margin: '300px 0' }}><img className={styles.logo} src={logo} alt="" /></p>
        <p><span className={styles.bgImage} /></p>
      </div>
    );
  }
}

export default (props) => <KeepAlive saveScrollPosition="screen"><Home {...props} /></KeepAlive>;
