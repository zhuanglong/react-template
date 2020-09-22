import React from 'react';

import logo from '@/assets/logo.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>Home Page</div>
                <p><img style={{ width: '100px' }} src={require('@/assets/avatar.jpg').default} alt="" /></p>
                <p><img style={{ width: '150px' }} src={logo} alt="" /></p>
            </div>
        );
    }
}

export default Home;