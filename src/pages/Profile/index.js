import React from 'react';
import { useAliveController } from 'react-activation';

import NavBar from '@/components/NavBar';
import * as userApi from '@/services/user';
import { tokenStorage } from '@/storage';
import styles from './styles.scss';

function Profile(props) {
  const { clear } = useAliveController();

  const onLogout = () => {
    userApi.logout().then((res) => {
      if (res.code === 0) {
        tokenStorage.del();
        clear();
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

export default Profile;
