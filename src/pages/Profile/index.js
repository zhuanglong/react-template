import React from 'react';
import { hot } from 'react-hot-loader/root';

import NavBar from '@/components/NavBar';
import * as userApi from '@/services/user';
import { tokenStorage } from '@/storage';
import styles from './styles.scss';

function Profile(props) {
  const onLogout = () => {
    userApi.logout().then((res) => {
      if (res.code === 0) {
        tokenStorage.del();
        props.history.replace('/login');
      } else {
        //
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.submitBtn} onClick={onLogout}>登出</div>
    </>
  );
}

export default hot(Profile);
