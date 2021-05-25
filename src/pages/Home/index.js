import React from 'react';
import styled from 'styled-components';

import logo from '@/assets/logo.jpg';
// import styles from './styles.less';

// import testModule from '@/common/testModule';

class Home extends React.Component {
  render() {
    return (
      <Root>
        <div className="title">
          Hello
          <span className="subTitle"> React</span>
        </div>
        <p><img className="avatar" src={require('@/assets/avatar.jpg').default} alt="" /></p>
        <p><img className="logo" src={logo} alt="" /></p>
        <p><span className="bgImage" /></p>
      </Root>
    );
  }
}

const Root = styled.div`
  @font-face {
    font-family: 'Ranchers-Regular';
    src: url(${require('@/assets/fonts/Ranchers-Regular.ttf').default}) format('truetype');
  }

  @font-face {
    font-family: 'algers';
    src: url(${require('@/assets/fonts/alger.ttf').default}) format('truetype');
  }

  .avatar {
    width: 100px;
  }

  .logo {
    width: 150px;
  }

  .bgImage {
    display: block;
    width: 100px;
    height: 100px;
    background-image: url(${require('@/assets/20210407170253.jpg').default});
    background-size: cover;
  }

  .title {
    display: flex;
    font-size: 18px;
    font-family: 'Ranchers-Regular', sans-serif;

    .subTitle {
      color: blue;
      font-family: 'algers', sans-serif;
    }
  }
`;

export default Home;
