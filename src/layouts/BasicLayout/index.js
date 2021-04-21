import React from 'react';
import { withRouter } from 'react-router-dom';

import NavBar from '@/components/NavBar';
// import styles from './styles.scss';

function BasicLayout(props) {
  return (
    <>
      {/* <NavBar title="首页" showBack={false} />
      <div style={{ height: hotcss.px2rem(55) }} /> */}
      {props.children}
    </>
  );
}

export default withRouter(BasicLayout);
