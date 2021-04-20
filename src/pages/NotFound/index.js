import React from 'react';

import styles from './styles.scss';

function NotFound(props) {
  const { history } = props;
  const goBack = () => {
    if (history.length === 2) {
      history.replace('/');
    } else {
      history.goBack();
    }
  };

  return (
    <div className={styles.container}>
      <div className="content">404 没有找到该资源</div>
      <div className="botton" onClick={goBack}>返回</div>
    </div>
  );
}

export default NotFound;
