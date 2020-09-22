import React from 'react';

import logo from '@/assets/logo.jpg';
import style from './style.less';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={style.title}>
                    hello
                    <span className={style.subTitle}> React</span>
                </div>
                <p><img className={style.avatar} src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img className={style.logo} src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;