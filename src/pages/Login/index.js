import React from 'react';

import * as userApi from '@/services/user';
import { tokenStorage } from '@/storage';
import styles from './styles.scss';

function Login(props) {
  const onLogin = () => {
    userApi.login({
      data: {
        phone: '13166668888',
        password: '123xxx321'
      }
    }).then((res) => {
      if (res.code === 0) {
        tokenStorage.set(res.data.token);
        props.history.replace('/');
      } else {
        //
      }
    });
  };

  return (
    <div className={styles.submitBtn} onClick={onLogin}>登录</div>
  );
}

export default Login;