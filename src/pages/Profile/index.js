import React from 'react';

import NavBar from '@/components/NavBar';
import * as services from '@/services';
import { tokenStorage } from '@/storage';
import styles from './styles.scss';

function Profile(props) {
  const onLogout = () => {
    services.logout().then((res) => {
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

export default Profile;
