import React from 'react';

import logo from '@/assets/logo.jpg';
import styles from './styles.less';

// import test from '@/test';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.title}>
                    hello
                    <span className={styles.subTitle}> React</span>
                </div>
                <p><img className={styles.avatar} src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img className={styles.logo} src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;