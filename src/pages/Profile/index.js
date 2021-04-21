import React from 'react';

import NavBar from '@/components/NavBar';
import styles from './styles.scss';

function Profile() {
  return (
    <>
      <NavBar />
      <div className={styles.title}>
        Profile
      </div>
    </>
  );
}

export default Profile;
