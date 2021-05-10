import React from 'react';

import history from '@/router/history';
import './styles.scss';

const prefixCls = 'sru-ErrorPage';

function ErrorPage() {
  const goBack = () => {
    if (history.length === 2) {
      history.replace('/');
    } else {
      history.goBack();
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-content`}>Page Error</div>
      <div className={`${prefixCls}-bottonGroup`}>
        <div className={`${prefixCls}-botton`} onClick={goBack}>返回</div>
        <div className={`${prefixCls}-botton`} onClick={reload}>刷新</div>
      </div>
    </div>
  );
}

export default ErrorPage;
